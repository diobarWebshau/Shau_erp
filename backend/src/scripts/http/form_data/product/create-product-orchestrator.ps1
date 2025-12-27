param(
  [string]$BaseUrl   = "http://localhost:3003",
  [string]$Endpoint  = "/product/orchestrator",
  [string]$PhotoPath = ".\fixture\sal.jpg"
)

$ErrorActionPreference = "Stop"
$Url = "$BaseUrl$Endpoint"

if (-not (Test-Path $PhotoPath)) { throw "Photo file not found: $PhotoPath" }

$payload = @{
  product = @{
    name               = "Producto Orquestadoasdsa Full"
    custom_id          = $null
    type               = "producto"
    description        = "Creado con oasdsarchestrator + relaciones"
    presentation       = "Caja"
    unit_of_measure    = "pz"
    storage_conditions = "Seco"
    barcode            = $null
    sku                = "SKU-ORsadasCH-FULL-0001"
    photo              = $null
    sale_price         = 199.99
    production_cost    = 125.50
    active             = $true
    is_draft           = $false
  }

  products_inputs = @(
    @{ input_id = 1; equivalence = 2 }
    @{ input_id = 2; equivalence = 1 }
  )

  product_processes = @(
    @{
      process_id = 1
      sort_order = 1
      product_input_process = @(
        @{ qty = 5; product_input = @{ input_id = 1; equivalence = 2 } }
        @{ qty = 2; product_input = @{ input_id = 2; equivalence = 1 } }
      )
    }
    @{
      sort_order = 2
      process = @{
        name        = "Proceso Nuevo Orqasdssaad"
        description = "Creado desde orchessdatrator"
      }
      product_input_process = @(
        @{ qty = 3; product_input = @{ input_id = 1; equivalence = 2 } }
      )
    }
  )

  product_discount_ranges = @(
    @{ unit_price = 180.00; min_qty = 10; max_qty = 50 }
    @{ unit_price = 160.00; min_qty = 51; max_qty = 200 }
  )
}

$payloadJson = $payload | ConvertTo-Json -Depth 50 -Compress

# archivo temporal SIN BOM (UTF-8 no bom)
$PayloadFile = Join-Path $env:TEMP ("product_orchestrator_payload_{0}.json" -f ([guid]::NewGuid().ToString("N")))
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PayloadFile, $payloadJson, $utf8NoBom)

Write-Host "POST $Url"
Write-Host "Photo:   $PhotoPath"
Write-Host "Payload: $payloadJson"

try {
  curl.exe -sS -X POST "$Url" `
    -H "Accept: application/json" `
    -F "payload=<$PayloadFile" `
    -F "photo=@$PhotoPath"
}
finally {
  Remove-Item -Path $PayloadFile -Force -ErrorAction SilentlyContinue
}
