import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';


const totalUsers : Object = [];
  
const config = {    
    //databaseURL: "https://tienda-501bc.firebaseio.com/usuarios/.json"
    databaseURL: "https://tienda-501bc.firebaseio.com/"
 };

firebase.initializeApp(config);

const productosDb = firebase.database().ref().child('productos')
const usuariosDb = firebase.database().ref().child('usuarios')

usuariosDb.orderByChild("id").on("child_added", function(snapshot) {
  totalUsers.push(snapshot.key)
});
