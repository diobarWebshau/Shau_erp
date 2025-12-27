param(
  [int]$ProductId    = 34,
  [string]$BaseUrl   = "http://localhost:3003",

  # PATCH: orquestador
  [string]$Endpoint  = "/product/orchestrator",

  # GET real: query que trae el producto con TODAS las relaciones
  [string]$GetEndpoint = "/query/product"
)

$ErrorActionPreference = "Stop"

$UrlPatch = "$BaseUrl$Endpoint/$ProductId"
$UrlGet   = "$BaseUrl$GetEndpoint/$ProductId"

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

# Asegura que exista la colección, aunque el backend no la mande
if (-not $current.product_discount_ranges) {
  $current | Add-Member -NotePropertyName product_discount_ranges -NotePropertyValue @()
}

# Elemento a actualizar (primero si existe)
$drUpdate = if ($current.product_discount_ranges.Count -gt 0) { $current.product_discount_ranges[0] } else { $null }

# Elemento a eliminar (segundo si existe). Si no existe, NO borramos nada para evitar
# borrar el mismo que estás actualizando (conflicto update+delete del mismo id).
$drDelete = if ($current.product_discount_ranges.Count -gt 1) { $current.product_discount_ranges[1] } else { $null }

# ---------------------------------------------
# Normalización de arrays (evita [[]])
# ---------------------------------------------
$updatedRanges = @()
if ($drUpdate) {
  $updatedRanges += @{
    id         = [int]$drUpdate.id
    product_id = [int]$drUpdate.product_id

    # si tu update usecase solo permite unit_price, deja solo esto (además de product_id)
    unit_price = [math]::Round([double]($drUpdate.unit_price + 10), 2)

    # Si tu backend también espera min/max para update, descomenta:
    # min_qty    = [int]$drUpdate.min_qty
    # max_qty    = [int]$drUpdate.max_qty
  }
}

$deletedRanges = @()
if ($drDelete) {
  # Tu backend valida "deleted" como objeto COMPLETO (ProductDiscountRangeProps).
  # Así que mandamos el objeto del GET con los campos requeridos.
  $deletedRanges += @{
    id         = [int]$drDelete.id
    product_id = [int]$drDelete.product_id
    unit_price = [double]$drDelete.unit_price
    min_qty    = [int]$drDelete.min_qty
    max_qty    = [int]$drDelete.max_qty

    # Si tu API los manda como string ISO, los pasas tal cual.
    created_at = [string]$drDelete.created_at
    updated_at = [string]$drDelete.updated_at
  }
}


# ---------------------------------------------
# Payload del orquestador
# ---------------------------------------------
$payload = @{
  product = @{}

  products_inputs_manager   = @{ added=@(); updated=@(); deleted=@() }
  product_processes_manager = @{ added=@(); updated=@(); deleted=@() }

  product_discount_ranges_manager = @{
    added = @(
      @{ unit_price = 100; min_qty = 201; max_qty = 300 }
    )
    updated = $updatedRanges
    deleted = $deletedRanges
  }
}

$payloadJson = $payload | ConvertTo-Json -Depth 20 -Compress

$PayloadFile = Join-Path $env:TEMP ("orq_update_discounts_{0}.json" -f ([guid]::NewGuid().ToString("N")))
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
