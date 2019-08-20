import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import * as request from 'superagent';
import {  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
//-------------------------------------------------------
import LoginFirebase from './FirebaseDB.jsx';
//-------------------------------------------------------

const USUARIODB = firebase.database().ref().child('usuarios')

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { //Inicializar variables
      email: '',
      password: '',
      mensaje: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }
//-----------------------------------------------------------
  checkSession(){
    return sessionStorage.getItem("Session");
  }
//--------------------------------------------------------------
  handleChange(event) {
    if(event.target.id == "email"){
      this.setState({email: event.target.value});
    }
    if(event.target.id == "password"){
        this.setState({password: event.target.value});
    }
  }
//-----------------------------------------------------------------------------
  checkLogin(event) {
    event.preventDefault();

    let email = this.state.email.toLowerCase()
    let emailId = email.replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
    let password = this.state.password;
    let mensajeLogin = '';

    USUARIODB.child(emailId).once('value', function(snapshot) {
    let userData = snapshot.val();
    console.log(email);
    console.log(password);
      if(email === "ingmvalle@yahoo.com") {
      //if (userData !== null) {
        //alert('user ' + email  + ' exists!' + snapshot.val());
        //console.log(snapshot.val())
        //console.log ('Email correcto: ' + userData.email)
        if (password === "123"){
        //if (userData.password == password){
          mensajeLogin = "Iniciando Sesión";
          sessionStorage.setItem("Session", email);
        }else{
          mensajeLogin = 'Contraseña incorrecta';
        }
      }else{
        mensajeLogin = "El usuario " +email + " no existe";
      }
    });
    this.setState({mensaje : mensajeLogin});
    console.log(mensajeLogin)
  }
//------------------------------------------------------------------------------
    render(){
    if (this.checkSession()){
      return <Redirect to='/tienda'/>
    }
      return(
        <div className="login">
          <div className="col-lg-3">
            <form form-container onSubmit={this.checkLogin}>
              
              <div class="loginTitle">Inicio de Sesión</div>
              
              <div className="form-group fields-Container">
                <input type="email" ref="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="ingmvalle@yahoo.com" className="validate white-text form-control" required aria-required="true" />
              </div>

              <div className="form-group fields-Container">
                <input type="password" ref="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="123" className="validate  white-text form-control" required aria-required="true" />
              </div>

              <div className="btnIngresar center-block">
                <div className="mensaje text-center">
                {this.state.mensaje}
                </div>
                <button type="submit" className="btn btn-success " >Ingresar</button>
              </div>
             
            </form>
            <br/><br/>
            <div class="center-block fondo-dark pista">
              <p >Usuario: ingmvalle@yahoo.com</p>
              <p>password: 123</p>
            </div>
          </div>
        </div>
     );
    }
}
export default LoginForm;
