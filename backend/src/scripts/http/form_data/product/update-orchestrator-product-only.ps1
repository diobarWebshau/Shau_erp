param(
  [int]$ProductId   = 64,
  [string]$BaseUrl  = "http://localhost:3003",
  [string]$Endpoint = "/product/orchestrator",
  [string]$PhotoPath = ".\fixture\sal-gusano.png"
)

$ErrorActionPreference = "Stop"
$Url = "$BaseUrl$Endpoint/$ProductId"

if (-not (Test-Path $PhotoPath)) { throw "Photo file not found: $PhotoPath" }

$payload = @{
  product = @{
    name            = "Producto Actualizado (solo product)"
    sku             = "SKU-ONLY-PRODUCT-0001"
    active          = $true
    is_draft        = $false
    sale_price      = 210.50
    production_cost = 130.25

    # ✅ NO pongas "photo" aquí si no quieres tocarla
    # photo = null $   # <- esto BORRA la foto si tu usecase lo interpreta así
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

$payloadJson = $payload | ConvertTo-Json -Depth 100 -Compress

# archivo temporal SIN BOM (UTF-8 no bom)
$PayloadFile = Join-Path $env:TEMP ("product_orchestrator_update_{0}.json" -f ([guid]::NewGuid().ToString("N")))
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PayloadFile, $payloadJson, $utf8NoBom)

Write-Host "PATCH $Url"
Write-Host "Photo:   $PhotoPath"   # ✅ NO pongas "photo" aquí si no quieres tocarla
Write-Host "Payload: $payloadJson"

try {
  curl.exe -sS -X PATCH "$Url" `
    -H "Accept: application/json" `
    -F "payload=<$PayloadFile" `
    -F "photo=@$PhotoPath"

}
finally {
  Remove-Item -Path $PayloadFile -Force -ErrorAction SilentlyContinue
}
