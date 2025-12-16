curl -X POST http://localhost:3003/product \
  -F "name=Producto Y" \
  -F "sku=SKU12345" \
  -F "active=1" \
  -F "is_draft=0" \
  -F "photo=@./fixture/sal.jpg"