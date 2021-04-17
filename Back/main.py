from flask import Flask
from flask import jsonify
from Usuario import Usuario
from flask_cors import CORS, cross_origin
from flask import request

def create_app(): 
    app = Flask(__name__)
    CORS(app) 
    return app 

app = create_app()
usuarios = [Usuario("1","1","1","1","1")]   

#creacion del contenido o url's 
@app.route('/api/users',methods=['GET'])
def get_users(): 
    response = []
    for i in usuarios: 
        response.append({'id':i.id,'password':i.password,'nombre':i.nombre,'apellido':i.apellido,'edad':i.edad}) 
    return jsonify(response) 

@app.route('/api/users/<id>',methods=['GET'])
def get_user(id): 
    for i in usuarios: 
        if i.id == id:  
            return jsonify({'id':i.id,'password':i.password,'nombre':i.nombre,'apellido':i.apellido,'edad':i.edad})
    return jsonify({'response':'no existe el usuario'})

@app.route('/api/deleteuser/<id>',methods=['GET'])
def get_deleteuser(id): 
    for i in usuarios: 
        if i.id == id: 
            usuarios.remove(i)
            return jsonify("se elimino")
    return jsonify({'response':'no existe el id'}) 


@app.route('/api/insertuser',methods=['POST'])
def create_user(): 
    json = request.get_json(force=True) 
    if not (json.get('id') is None) and not (json.get('password') is None) and not (json.get('nombre') is None) and not (json.get('apellido') is None) and not (json.get('edad') is None): 
        usuarios.append(Usuario(json.get('id'),json.get('password'),json.get('nombre'),json.get('apellido'),json.get('edad')))
        return jsonify({'response':'ok'}) 
    else: 
        return jsonify({'response':'no ok'}) 

@app.route('/api/modificaruser',methods=['POST'])
def modificar_user(): 
    json = request.get_json(force=True) 
    if not (json.get('id') is None) and not (json.get('password') is None) and not (json.get('nombre') is None) and not (json.get('apellido') is None) and not (json.get('edad') is None): 
        for i in usuarios: 
            if i.id == json.get('id'): 
            #modificar = usuarios[usuarios.index[i]]
                i.id = json.get('id') 
                i.password = json.get('password') 
                i.nombre = json.get('nombre') 
                i.apellido = json.get('apellido') 
                i.edad = json.get('edad') 
            return jsonify("se modifico")
        return jsonify({'response':'no existe usuario'}) 
    else: 
        return jsonify({'response':'no ok'}) 


if __name__ == '__main__': 
    app.run(debug=True) 