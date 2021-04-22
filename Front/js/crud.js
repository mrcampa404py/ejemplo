//esta funcion ingresa los datos 
document.getElementById('agregarnuevo').addEventListener("click", pulsar, false);

function pulsar() {

    //aqui estaran los datos 
    var id = document.getElementById('id_insertar_dato').value
    var password = document.getElementById('password_insertar_dato').value
    var nombre = document.getElementById('nombre_insertar_dato').value
    var apellido = document.getElementById('apellido_insertar_dato').value
    var edad = document.getElementById('edad_insertar_dato').value

    var request = new XMLHttpRequest()
    request.open('POST', `http://127.0.0.1:5000/api/insertuser`, true)
    request.setRequestHeader('Content-type', 'application/json');

    var params = `{
        "id":"${id}",
        "password":"${password}",
        "nombre":"${nombre}",
        "apellido":"${apellido}",
        "edad":"${edad}" 
    }`
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data)
        } else {
            console.log('error')
        }
    }

    request.send(params)


}

//esta funcion modifica los datos 
document.getElementById('modificarDatos').addEventListener("click", actualizar, false);

function actualizar() { 

    //aqui estaran los datos 
    var id = document.getElementById('id_insertar_dato').value
    var password = document.getElementById('password_insertar_dato').value
    var nombre = document.getElementById('nombre_insertar_dato').value
    var apellido = document.getElementById('apellido_insertar_dato').value
    var edad = document.getElementById('edad_insertar_dato').value

    var request = new XMLHttpRequest()
    request.open('POST', `http://127.0.0.1:5000/api/modificaruser`, true)
    request.setRequestHeader('Content-type', 'application/json');

    var params = `{
        "id":"${id}",
        "password":"${password}",
        "nombre":"${nombre}",
        "apellido":"${apellido}",
        "edad":"${edad}" 
    }`
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data)
        } else {
            console.log('error')
        }
    }

    request.send(params)


}



function editar(id){
    var request = new XMLHttpRequest()
    request.open('GET', `http://127.0.0.1:5000/api/users/${id}`, true) 
    request.setRequestHeader('Content-type', 'application/json');
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            //aqui estaran los datos 
            document.getElementById('id_insertar_dato').value = data.id; 
            document.getElementById('password_insertar_dato').value = data.password; 
            document.getElementById('nombre_insertar_dato').value = data.nombre; 
            document.getElementById('apellido_insertar_dato').value = data.apellido; 
            document.getElementById('edad_insertar_dato').value = data.edad; 
        } else {
            console.log('error')
        }
    }
    request.send()
    
}

function eliminar(id){
    var request = new XMLHttpRequest()
    request.open('GET', `http://127.0.0.1:5000/api/deleteuser/${id}`, true) 
    request.setRequestHeader('Content-type', 'application/json');
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data)
        } else {
            console.log('error')
        }
    }
    request.send()
}

function llenar_tabla() {
    var request = new XMLHttpRequest()
    request.open('GET', 'http://127.0.0.1:5000/api/users', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            for(var i=0; i<data.length; i++){
                console.log(data[i]); 
                $("#tabla_agregar>tbody").append(
                    `<tr>
                    <th scope="row">${data[i].id}</th>
                    <td>${data[i].password}</td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].apellido}</td>
                    <td>${data[i].edad}</td>
                    <td><button onclick="editar(${data[i].id})" type="button">Editar</button></td>
                    <td><button onclick="eliminar(${data[i].id})">Eliminar</button></td>
                    </tr>`
                );
            }
        } else {
            console.log('error')
        }
    }
    request.send()
}

llenar_tabla();