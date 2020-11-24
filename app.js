let process = require('process');

let moduloDeProductos = require('./modulos');

let comando = process.argv[2];

switch (comando) {
    case 'listar':
        let productos = moduloDeProductos.leerJSON();

        if (productos.length === 0) {
            console.log('La lista de productos esta vacia');
        } else {
            console.log('-----' + 'LISTA DE PRODUCTOS' + '-----');
            for (let i = 0; i < productos.length; i++) {
                console.log(productos[i].id + ': ' + productos[i].name + ' --- PRICE: ' + productos[i].price);
            };
        }
        break;
    case 'agregar':
        let name = process.argv[3];
        let price = Number(process.argv[4]);

        if (name === undefined || price === undefined) {
            console.log('-----Debe ingresar los datos requeridos-----');
        } else {
            moduloDeProductos.escribirJSON(name, price);
            console.log('-----Producto añadido correctamente-----');
        }
        break;
    case 'filtrar':
        let datoA = process.argv[3];
        let datoB = process.argv[4];
        let resultado = moduloDeProductos.filtrar(datoA, datoB);
        if (datoA === undefined || datoB === undefined) {
            console.log('-----Debe ingresar los datos requeridos-----');
        } else {
            for (let i = 0; i < resultado.length; i++) {
                console.log(resultado[i].id + ': ' + resultado[i].name + ' --- PRICE: ' + resultado[i].price);
            };
        };
        break;
    case 'cambiarPrecio':
        let id = Number(process.argv[3]);
        let nuevoPrecio = Number(process.argv[4]);
        if (id == undefined || nuevoPrecio == undefined) {
            console.log(moduloDeProductos.cambiarPrecio(id, nuevoPrecio));
        } else {
            console.log('-----Debe ingresar los datos requeridos-----');
        }

        break;
    case 'eliminarProducto':
        let eliminarId = Number(process.argv[3]);
        if (eliminarId === undefined) {
            console.log('-----Debe ingresar el ID de producto a eliminar-----');
        } else {
            moduloDeProductos.eliminarProducto(eliminarId);
            console.log('-----El producto ha sido eliminado-----');
        }
        break;
    case 'buscarProducto':
        let parametro = Number(process.argv[3]);
        let productoBuscado = moduloDeProductos.buscarProducto(parametro);

        if (productoBuscado.length !== 0) {
            productoBuscado.forEach(element => {
                console.log(element.id + ': ' + element.name + ' ---PRICE ' + element.price);
            });
        } else {

            console.log('----------------------');
            console.log('Producto no encontrado');
            console.log('----------------------');

        }
        break;
}