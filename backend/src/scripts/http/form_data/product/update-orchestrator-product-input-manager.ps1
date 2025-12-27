param(
  [int]$ProductId    = 34,
  [string]$BaseUrl   = "http://localhost:3003",

  # PATCH: orquestador
  [string]$Endpoint  = "/product/orchestrator",

  # GET real (query con relaciones)
  [string]$GetEndpoint = "/query/product",

  # ADD (elige un input real existente en tu BD)
  [int]$AddInputId = 3,
  [int]$AddEquivalence = 1
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

# Asegura colección
if (-not $current.products_inputs) {
  $current | Add-Member -NotePropertyName products_inputs -NotePropertyValue @()
}

# -----------------------------
# 2) Elegir elementos para update/delete sin conflicto
# - update: el primero si existe
# - delete: el segundo si existe (si no existe, NO borramos nada)
# -----------------------------
$piUpdate = if ($current.products_inputs.Count -gt 0) { $current.products_inputs[0] } else { $null }
$piDelete = if ($current.products_inputs.Count -gt 1) { $current.products_inputs[1] } else { $null }

# Updated array (evita [[]])
$updatedInputs = @()
if ($piUpdate) {
  $updatedInputs += @{
    id = [int]$piUpdate.id
    # UpdateSchema es partial, aquí actualizamos equivalence
    equivalence = [int]($piUpdate.equivalence + 1)
  }
}

# Deleted array (objeto completo, pero "limpio")
$deletedInputs = @()
if ($piDelete) {
  $obj = @{
    id          = [int]$piDelete.id
    product_id  = [int]$piDelete.product_id
    input_id    = [int]$piDelete.input_id
    equivalence = [int]$piDelete.equivalence
  }

  # si existen timestamps en la respuesta del query, pásalos tal cual
  if ($piDelete.PSObject.Properties.Name -contains "created_at") { $obj.created_at = [string]$piDelete.created_at }
  if ($piDelete.PSObject.Properties.Name -contains "updated_at") { $obj.updated_at = [string]$piDelete.updated_at }

  $deletedInputs += $obj
}

# -----------------------------
# 3) Payload del orquestador UPDATE
# -----------------------------
$payload = @{
  product = @{}  # no tocamos el producto aquí

  products_inputs_manager = @{
    added = @(
      @{ input_id = [int]$AddInputId; equivalence = [int]$AddEquivalence }
    )
    updated = $updatedInputs
    deleted = $deletedInputs
  }

  product_processes_manager = @{ added=@(); updated=@(); deleted=@() }
  product_discount_ranges_manager = @{ added=@(); updated=@(); deleted=@() }
}

# -----------------------------
# 4) JSON (sin BOM) + PATCH multipart
# -----------------------------
$payloadJson = $payload | ConvertTo-Json -Depth 50 -Compress

$PayloadFile = Join-Path $env:TEMP ("orq_update_inputs_{0}.json" -f ([guid]::NewGuid().ToString("N")))
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
