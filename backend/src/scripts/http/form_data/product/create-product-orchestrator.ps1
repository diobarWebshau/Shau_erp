# create-product-orchestrator.ps1

$uri = "http://localhost:3003/product/orchestrator"

$args = @(
  "-X", "POST", $uri,

  # PRODUCT
  "-F", "product[name]=Producto Orquestado",
  "-F", "product[sku]=SKU-ORQ-001",
  "-F", "product[active]=1",
  "-F", "product[is_draft]=0",

  # FILE
  "-F", "photo=@./fixture/sal.jpg",

  # products_inputs[0]
  "-F", "products_inputs[0][input_id]=1",
  "-F", "products_inputs[0][equivalence]=2",

  # product_processes[0]
  "-F", "product_processes[0][sort_order]=1",
  "-F", "product_processes[0][process_id]=10",

  # product_processes[0].product_input_process[0]
  "-F", "product_processes[0][product_input_process][0][qty]=5",
  "-F", "product_processes[0][product_input_process][0][product_input][input_id]=1",
  "-F", "product_processes[0][product_input_process][0][product_input][equivalence]=2"
)

& curl.exe @args
