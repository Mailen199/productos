let fs = require('fs');

module.exports = moduloDeProductos = {
    archivo: './json.json',
    leerJSON: function () {
        let listaDeProductos = fs.readFileSync(this.archivo, 'utf-8');
        return JSON.parse(listaDeProductos);
    },
    escribirJSON: function (nombreProducto, precio) {
        let listaDeProductos = this.leerJSON();
        let lastId = 1;// determinamos la variable donde se guardaran los nuevos id 

        listaDeProductos.map(function (producto) {//usamos .map para recorrer el array
            if (producto.id > lastId) {//si el id pasado es mayor al id de la lista de producto
                lastId = producto.id;// que nos devuelva el id pasado
            };
        });

        let Producto = function (id, name, price) {//nuevo producto a ingresar
            this.id = id,
                this.name = name,
                this.price = price
        };
        let nuevoProducto = new Producto(lastId + 1, nombreProducto, precio);//declaramos la variable donde se le pasaran los nuevos parametros "new";
        listaDeProductos.push(nuevoProducto);//utilizamos push para agregar el nuevo producto a la lista

        let productosActualizados = JSON.stringify(listaDeProductos);//pasamos a json con el metodo stringify
        fs.writeFileSync('./json.json', productosActualizados, 'utf-8')// y lo reescribimos
    },
    filtrar: function (datoA, datoB) {//ingreso parametros para su busqueda
        let listaDeProductos = this.leerJSON();
        let productosFiltrados = listaDeProductos.filter(function (precio) {
            return precio.price >= datoA && precio.price <= datoB;//indico el rango para filtrar los productos por su precio.price
        });
        return productosFiltrados;
    },
    cambiarPrecio: function (id, nuevoPrecio) {
        let listaDeProductos = this.leerJSON();
        let productoAModificar = listaDeProductos.filter(function (producto) {//filtramos el producto recorriendo el array
            if (producto.id === id) {// si el id de producto es igual al id pasado por parametro
                return producto.price = nuevoPrecio;// el precio de la lista reciba como parametro el nuevoPrecio pasado por parametro
            };
            return listaDeProductos;
        });

        let productoModificado = JSON.stringify(productoAModificar);//stringifycamos
        fs.writeFileSync('./json.json', productoModificado, 'utf-8');
    },
    eliminarProducto: function (id) {
        let listaDeProductos = this.leerJSON();
        let quitarProducto = listaDeProductos.filter(function (producto) {
            return producto.id !== id;//filtra los productos que no coincidan con el id de parametro
        });

        let nuevaLista = JSON.stringify(quitarProducto);
        fs.writeFileSync('./json.json', nuevaLista, 'utf-8');
    },
    buscarProducto: function (busqueda) {
        let listaDeProductos = moduloDeProductos.leerJSON();

        let productoBuscado = listaDeProductos.filter(producto => producto.name.toLowerCase().includes(busqueda.toLowerCase()))
        return productoBuscado;
    }
}

