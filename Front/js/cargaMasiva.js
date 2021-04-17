function successFunction(data) {
    var nuevo = data.split("\n");
    for (let i = 1; i < nuevo.length; i++) {

        var datos = nuevo[i].split(",");
        var request = new XMLHttpRequest()  

        request.open('POST', `http://127.0.0.1:5000/api/insertuser`, true) 
        request.setRequestHeader('Content-type', 'application/json');

        var params = `{
            "id":"${datos[0]}",
            "password":"${datos[1]}",
            "nombre":"${datos[2]}",
            "apellido":"${datos[3]}",
            "edad":"${datos[4]}" 
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
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');


        $.ajax({
            url: f.name,
            dataType: 'Text',
        }).done(successFunction);


    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

