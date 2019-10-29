# Rutas API CRM

## Rutas Clientes
Crear nuevos clientes, mostrar clientes, actualizar y eliminar
### Mostrrar todos los clientes : GET
```bash
localhost:5000/clientes # : trae todos los clientes 
```

### Crear nuevo cliente : POST
Cada cliente tiene: nombre, apellido, empresa, email y telefono
```bash
localhost:5000/clientes # crea nuevo cliente
```

### Mostrar un cliente en especifico mediante su id : GET
idCliente = id del cliente que quieres mostrar
```bash
localhost:5000/clientes/:idCliente # muestra un cliente en especifico
```

### Actuallizar un cliente en especifico mediante su id : PUT
```bash
localhost:5000/clientes/:idCliente # actualiza el cliente# Rutas API CRM
```

### Eliminar un cliente en especifico mediante su id : DELETE
```bash
localhost:5000/clientes/:idCliente # eliminar cliente
```

## Rutas Productos
Crear nuevos productos, mostrar productos, actualizar y eliminar
### Mostrrar todos los productos : GET
```bash
localhost:5000/productos # : trae todos los productos 
```

### Crear nuevo producto : POST
Cada producto tiene: nombre, precio, y una imagen opcional
```bash
localhost:5000/productos # crea nuevo producto
```

### Mostrar un producto especifico mediante su id : GET
idProducto = id del producto que quieres mostrar
```bash
localhost:5000/clientes/:idProducto  # mostrar producto especifico
```

### Actuallizar un cliente en especifico mediante su id : PUT
```bash
localhost:5000/productos/:idProducto # actualiza el producto mediante su id
```

### Eliminar un producto en especifico mediante su id : DELETE
```bash
localhost:5000/productos/:idProducto # eliminar producto
```

