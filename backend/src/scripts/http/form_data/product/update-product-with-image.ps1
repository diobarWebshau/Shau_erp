curl.exe -X PATCH http://localhost:3003/product/61 `
  -F "name=Producto Actuaasdlizado Final" `
  -F "sku=SKU-FINasdAL-9999" `
  -F "active=1" `
  -F "is_draft=0" `
  -F "production_cost=125.50" `
  -F "sale_price=199.99" `
  -F "photo=@./fixture/sal-gusano.png"
