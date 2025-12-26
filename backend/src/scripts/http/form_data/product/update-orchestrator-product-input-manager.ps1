param(
  [int]$ProductId   = 61,
  [string]$BaseUrl  = "http://localhost:3003",
  [string]$Endpoint = "/product/orchestrator"
)

$ErrorActionPreference = "Stop"
$Url = "$BaseUrl$Endpoint/$ProductId"

# 🔧 CAMBIA ESTOS IDS por los reales en tu BD:
$ExistingProductInputIdToUpdate = 101
$ExistingProductInputIdToDelete = 102

$payload = @{
  product = @{
    name = "Producto Update (product-input manager)"
    # no photo
  }

  products_inputs_manager = @{
    # ✅ added NO lleva product_id (lo resuelve backend)
    added = @(
      @{ input_id = 3; equivalence = 4 }
    )

    # ✅ updated requiere id + patch
    updated = @(
      @{ id = $ExistingProductInputIdToUpdate; equivalence = 7 }
    )

    # ✅ deleted = objeto completo (mínimo id + product_id + input_id + equivalence)
    deleted = @(
      @{ id = $ExistingProductInputIdToDelete; product_id = $ProductId; input_id = 2; equivalence = 1 }
    )
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

$PayloadFile = Join-Path $env:TEMP ("product_orchestrator_update_pi_{0}.json" -f ([guid]::NewGuid().ToString("N")))
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($PayloadFile, $payloadJson, $utf8NoBom)

Write-Host "PATCH $Url"
Write-Host "Payload: $payloadJson"

try {
  curl.exe -sS -X PATCH "$Url" `
    -H "Accept: application/json" `
    -F "payload=<$PayloadFile"
}
finally {
  Remove-Item -Path $PayloadFile -Force -ErrorAction SilentlyContinue
}
