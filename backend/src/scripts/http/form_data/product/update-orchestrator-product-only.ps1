param(
  [int]$ProductId    = 34,
  [string]$BaseUrl   = "http://localhost:3003",

  # PATCH: orquestador
  [string]$Endpoint  = "/product/orchestrator"
)

$ErrorActionPreference = "Stop"

$UrlPatch = "$BaseUrl$Endpoint/$ProductId"

# ---------------------------------------------
# Payload: SOLO PRODUCT
# - managers VACÍOS (obligatorio por tu schema)
# - NO incluimos product.photo aquí
#   * si pones photo = $null => pides borrar la foto
#   * si pones photo = "products/tmp/..." => flujo tmp (normalmente lo inyecta middleware)
# ---------------------------------------------
$payload = @{
  product = @{
    name            = "Producto Actualizado (solo product)"
    sku             = "SKU-ONLY-PRODUCT-0001"
    active          = $true
    is_draft        = $false
    sale_price      = 210.50
    production_cost = 130.25

    # ⛔ NO pongas "photo" si NO quieres tocarla
    # photo = $null
  }

  products_inputs_manager = @{
    added   = @()
    updated = @()
    deleted = @()
  }

  product_processes_manager = @{
    added   = @()
    updated = @()
    deleted = @()
  }

  product_discount_ranges_manager = @{
    added   = @()
    updated = @()
    deleted = @()
  }
}

$payloadJson = $payload | ConvertTo-Json -Depth 50 -Compress

# archivo temporal SIN BOM (UTF-8 no bom)
$PayloadFile = Join-Path $env:TEMP ("orq_update_only_product_{0}.json" -f ([guid]::NewGuid().ToString("N")))
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
