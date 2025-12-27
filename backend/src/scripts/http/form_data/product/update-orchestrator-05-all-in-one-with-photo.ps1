param(
  [int]$ProductId    = 34,
  [string]$BaseUrl   = "http://localhost:3003",

  [string]$Endpoint  = "/product/orchestrator",
  [string]$GetEndpoint = "/query/product",

  # Foto nueva
  [string]$PhotoPath = ".\fixture\sal.jpg",

  # Inputs a agregar (elige un input real)
  [int]$AddInputId = 3,
  [int]$AddEquivalence = 1,

  # Proceso existente a agregar
  [int]$AddProcessId = 1,

  # Discount a agregar
  [double]$AddUnitPrice = 100,
  [int]$AddMinQty = 201,
  [int]$AddMaxQty = 300
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $PhotoPath)) { throw "Photo file not found: $PhotoPath" }

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

# Asegurar colecciones (para evitar null/undefined)
if (-not $current.products_inputs) { $current | Add-Member -NotePropertyName products_inputs -NotePropertyValue @() }
if (-not $current.product_processes) { $current | Add-Member -NotePropertyName product_processes -NotePropertyValue @() }
if (-not $current.product_discount_ranges) { $current | Add-Member -NotePropertyName product_discount_ranges -NotePropertyValue @() }

# Necesitamos al menos 1 input asignado para armar PIP
if ($current.products_inputs.Count -lt 1) {
  throw "Necesitas al menos 1 products_inputs asignado al producto para armar PIP (product_input_process)."
}

$pi0 = $current.products_inputs[0]

# -----------------------------
# 2) PRODUCT INPUTS: update/delete sin conflicto
# -----------------------------
$piUpdate = if ($current.products_inputs.Count -gt 0) { $current.products_inputs[0] } else { $null }
$piDelete = if ($current.products_inputs.Count -gt 1) { $current.products_inputs[1] } else { $null }

$inputsUpdated = @()
if ($piUpdate) {
  $inputsUpdated += @{
    id = [int]$piUpdate.id
    equivalence = [int]($piUpdate.equivalence + 1)
  }
}

$inputsDeleted = @()
if ($piDelete) {
  $obj = @{
    id          = [int]$piDelete.id
    product_id  = [int]$piDelete.product_id
    input_id    = [int]$piDelete.input_id
    equivalence = [int]$piDelete.equivalence
  }
  if ($piDelete.PSObject.Properties.Name -contains "created_at") { $obj.created_at = [string]$piDelete.created_at }
  if ($piDelete.PSObject.Properties.Name -contains "updated_at") { $obj.updated_at = [string]$piDelete.updated_at }
  $inputsDeleted += $obj
}

# -----------------------------
# 3) PROCESSES: update/delete sin conflicto
# -----------------------------
$ppUpdate = if ($current.product_processes.Count -gt 0) { $current.product_processes[0] } else { $null }
$ppDelete = if ($current.product_processes.Count -gt 1) { $current.product_processes[1] } else { $null }

$pipUpdate = $null
$pipDelete = $null
if ($ppUpdate -and $ppUpdate.product_input_process) {
  if ($ppUpdate.product_input_process.Count -gt 0) { $pipUpdate = $ppUpdate.product_input_process[0] }
  if ($ppUpdate.product_input_process.Count -gt 1) { $pipDelete = $ppUpdate.product_input_process[1] }
}

$processesUpdated = @()
if ($ppUpdate) {
  $pipManager = @{
    added = @(
      @{
        qty = 9
        product_input = @{
          input_id    = [int]$pi0.input_id
          equivalence = [int]$pi0.equivalence
        }
      }
    )
    updated = @()
    deleted = @()
  }

  if ($pipUpdate) {
    $pipManager.updated += @{
      id  = [int]$pipUpdate.id
      qty = [double]($pipUpdate.qty + 2)
    }
  }

  if ($pipDelete) {
    $objPip = @{
      id                 = [int]$pipDelete.id
      product_id         = [int]$pipDelete.product_id
      product_input_id   = [int]$pipDelete.product_input_id
      product_process_id = [int]$pipDelete.product_process_id
      qty                = [double]$pipDelete.qty
    }
    if ($pipDelete.PSObject.Properties.Name -contains "created_at") { $objPip.created_at = [string]$pipDelete.created_at }
    if ($pipDelete.PSObject.Properties.Name -contains "updated_at") { $objPip.updated_at = [string]$pipDelete.updated_at }
    $pipManager.deleted += $objPip
  }

  $processesUpdated += @{
    id = [int]$ppUpdate.id
    sort_order = [int]($ppUpdate.sort_order + 10)
    product_input_process_updated = $pipManager
  }
}

$processesDeleted = @()
if ($ppDelete) {
  $obj = @{
    id        = [int]$ppDelete.id
    product_id = [int]$ppDelete.product_id
    process_id = [int]$ppDelete.process_id
    sort_order = [int]$ppDelete.sort_order
  }
  if ($ppDelete.PSObject.Properties.Name -contains "created_at") { $obj.created_at = [string]$ppDelete.created_at }
  if ($ppDelete.PSObject.Properties.Name -contains "updated_at") { $obj.updated_at = [string]$ppDelete.updated_at }
  $processesDeleted += $obj
}

# -----------------------------
# 4) DISCOUNTS: update/delete sin conflicto
# -----------------------------
$drUpdate = if ($current.product_discount_ranges.Count -gt 0) { $current.product_discount_ranges[0] } else { $null }
$drDelete = if ($current.product_discount_ranges.Count -gt 1) { $current.product_discount_ranges[1] } else { $null }

$discountsUpdated = @()
if ($drUpdate) {
  $discountsUpdated += @{
    id         = [int]$drUpdate.id
    unit_price = [math]::Round([double]($drUpdate.unit_price + 10), 2)
  }
}

$discountsDeleted = @()
if ($drDelete) {
  $obj = @{
    id         = [int]$drDelete.id
    product_id = [int]$drDelete.product_id
    unit_price = [double]$drDelete.unit_price
    min_qty    = [int]$drDelete.min_qty
    max_qty    = [int]$drDelete.max_qty
  }
  if ($drDelete.PSObject.Properties.Name -contains "created_at") { $obj.created_at = [string]$drDelete.created_at }
  if ($drDelete.PSObject.Properties.Name -contains "updated_at") { $obj.updated_at = [string]$drDelete.updated_at }
  $discountsDeleted += $obj
}

# -----------------------------
# 5) Payload FULL (incluye product + foto)
# NOTA: NO ponemos product.photo manualmente.
# Tu middleware debe inyectar ruta tmp en payload.product.photo al subir "photo=@file"
# -----------------------------
$payload = @{
  product = @{
    name            = "Producto FULL UPDATE + FOTO"
    sku             = "SKU-ORQ-FULL-UPDATE-0001"
    active          = $true
    is_draft        = $false
    sale_price      = 250.00
    production_cost = 150.00
  }

  products_inputs_manager = @{
    added = @(
      @{ input_id = [int]$AddInputId; equivalence = [int]$AddEquivalence }
    )
    updated = $inputsUpdated
    deleted = $inputsDeleted
  }

  product_processes_manager = @{
    added = @(
      @{
        process_id = [int]$AddProcessId
        sort_order = 99
        product_input_process = @(
          @{
            qty = 4
            product_input = @{
              input_id    = [int]$pi0.input_id
              equivalence = [int]$pi0.equivalence
            }
          }
        )
      }
    )
    updated = $processesUpdated
    deleted = $processesDeleted
  }

  product_discount_ranges_manager = @{
    added = @(
      @{ unit_price = [double]$AddUnitPrice; min_qty = [int]$AddMinQty; max_qty = [int]$AddMaxQty }
    )
    updated = $discountsUpdated
    deleted = $discountsDeleted
  }
}

# -----------------------------
# 6) JSON (sin BOM) + PATCH multipart (payload + foto)
# -----------------------------
$payloadJson = $payload | ConvertTo-Json -Depth 120 -Compress

$PayloadFile = Join-Path $env:TEMP ("orq_update_all_{0}.json" -f ([guid]::NewGuid().ToString("N")))
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PayloadFile, $payloadJson, $utf8NoBom)

Write-Host "PATCH $UrlPatch"
Write-Host "Photo:   $PhotoPath"
Write-Host "Payload: $payloadJson"

try {
  curl.exe -sS -X PATCH "$UrlPatch" `
    -H "Accept: application/json" `
    -F "payload=<$PayloadFile" `
    -F "photo=@$PhotoPath"
}
finally {
  Remove-Item -Path $PayloadFile -Force -ErrorAction SilentlyContinue
}
