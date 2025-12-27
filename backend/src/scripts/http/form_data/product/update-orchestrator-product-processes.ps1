param(
  [int]$ProductId    = 34,
  [string]$BaseUrl   = "http://localhost:3003",

  [string]$Endpoint  = "/product/orchestrator",
  [string]$GetEndpoint = "/query/product",

  # ADD: asignar proceso existente
  [int]$AddProcessId = 1,
  [int]$AddSortOrder = 99
)

$ErrorActionPreference = "Stop"

$UrlPatch = "$BaseUrl$Endpoint/$ProductId"
$UrlGet   = "$BaseUrl$GetEndpoint/$ProductId"

# -----------------------------
# 1) GET actual (con relaciones)
# -----------------------------
Write-Host "GET  $UrlGet"
try {
  $current = Invoke-RestMethod -Method GET -Uri $UrlGet -Headers @{ Accept="application/json" }
}
catch {
  $resp = $_.Exception.Response
  if ($resp -and $resp.GetResponseStream()) {
    $reader = New-Object System.IO.StreamReader($resp.GetResponseStream())
    $body = $reader.ReadToEnd()
    Write-Host "GET failed: HTTP $([int]$resp.StatusCode) $($resp.StatusDescription)"
    Write-Host "Body: $body"
  } else {
    Write-Host "GET failed: $($_.Exception.Message)"
  }
  throw
}

# Asegurar colecciones
if (-not $current.products_inputs) { $current | Add-Member -NotePropertyName products_inputs -NotePropertyValue @() }
if (-not $current.product_processes) { $current | Add-Member -NotePropertyName product_processes -NotePropertyValue @() }

# Necesitamos al menos 1 input asignado para poder armar product_input_process (pip)
if ($current.products_inputs.Count -lt 1) {
  throw "Necesitas al menos 1 products_inputs asignado al producto para crear PIP en procesos."
}

$pi0 = $current.products_inputs[0]

# -----------------------------
# 2) Elegir proceso para update/delete sin conflicto
# - update: el primero si existe
# - delete: el segundo si existe (si no existe, NO borramos nada)
# -----------------------------
$ppUpdate = if ($current.product_processes.Count -gt 0) { $current.product_processes[0] } else { $null }
$ppDelete = if ($current.product_processes.Count -gt 1) { $current.product_processes[1] } else { $null }

# Dentro del proceso a actualizar, intentamos tomar PIPs (si existen)
$pipUpdate = $null
$pipDelete = $null
if ($ppUpdate -and $ppUpdate.product_input_process) {
  if ($ppUpdate.product_input_process.Count -gt 0) { $pipUpdate = $ppUpdate.product_input_process[0] }
  if ($ppUpdate.product_input_process.Count -gt 1) { $pipDelete = $ppUpdate.product_input_process[1] }
}

# -----------------------------
# 3) Construir updated/deleted arrays (evita [[]])
# -----------------------------
$updatedProcesses = @()
if ($ppUpdate) {

  # nested manager para PIP (solo si hay algo que tocar)
  $pipManager = @{
    added = @(
      @{
        qty = 7
        product_input = @{
          input_id     = [int]$pi0.input_id
          equivalence  = [int]$pi0.equivalence
        }
      }
    )
    updated = @()
    deleted = @()
  }

  if ($pipUpdate) {
    $pipManager.updated += @{
      id  = [int]$pipUpdate.id
      qty = [double]($pipUpdate.qty + 1)
    }
  }

  if ($pipDelete) {
    $objPip = @{
      id               = [int]$pipDelete.id
      product_id       = [int]$pipDelete.product_id
      product_input_id = [int]$pipDelete.product_input_id
      product_process_id = [int]$pipDelete.product_process_id
      qty              = [double]$pipDelete.qty
    }
    if ($pipDelete.PSObject.Properties.Name -contains "created_at") { $objPip.created_at = [string]$pipDelete.created_at }
    if ($pipDelete.PSObject.Properties.Name -contains "updated_at") { $objPip.updated_at = [string]$pipDelete.updated_at }
    $pipManager.deleted += $objPip
  }

  $updatedProcesses += @{
    id = [int]$ppUpdate.id
    sort_order = [int]($ppUpdate.sort_order + 1)
    product_input_process_updated = $pipManager
  }
}

$deletedProcesses = @()
if ($ppDelete) {
  $obj = @{
    id        = [int]$ppDelete.id
    product_id = [int]$ppDelete.product_id
    process_id = [int]$ppDelete.process_id
    sort_order = [int]$ppDelete.sort_order
  }
  if ($ppDelete.PSObject.Properties.Name -contains "created_at") { $obj.created_at = [string]$ppDelete.created_at }
  if ($ppDelete.PSObject.Properties.Name -contains "updated_at") { $obj.updated_at = [string]$ppDelete.updated_at }
  $deletedProcesses += $obj
}

# -----------------------------
# 4) Payload (ADD proceso existente + UPDATE + DELETE)
# -----------------------------
$payload = @{
  product = @{}

  products_inputs_manager   = @{ added=@(); updated=@(); deleted=@() }

  product_processes_manager = @{
    added = @(
      @{
        process_id = [int]$AddProcessId
        sort_order = [int]$AddSortOrder
        product_input_process = @(
          @{
            qty = 5
            product_input = @{
              input_id    = [int]$pi0.input_id
              equivalence = [int]$pi0.equivalence
            }
          }
        )
      }
    )
    updated = $updatedProcesses
    deleted = $deletedProcesses
  }

  product_discount_ranges_manager = @{ added=@(); updated=@(); deleted=@() }
}

# -----------------------------
# 5) JSON (sin BOM) + PATCH
# -----------------------------
$payloadJson = $payload | ConvertTo-Json -Depth 80 -Compress

$PayloadFile = Join-Path $env:TEMP ("orq_update_processes_{0}.json" -f ([guid]::NewGuid().ToString("N")))
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PayloadFile, $payloadJson, $utf8NoBom)

Write-Host "PATCH $UrlPatch"
Write-Host "Payload: $payloadJson"

try {
  curl.exe -sS -X PATCH "$UrlPatch" `
    -H "Accept: application/json" `
    -F "payload=<$PayloadFile"
}
finally {
  Remove-Item -Path $PayloadFile -Force -ErrorAction SilentlyContinue
}
