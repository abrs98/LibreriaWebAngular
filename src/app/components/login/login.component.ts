import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private btnIngresar: any = null;

  constructor() {
    this.btnIngresar = <HTMLInputElement>document.getElementById('btnIngresar');
    console.log('Funciona Constructor');
  }

  public ingresarSesion = async (any: any): Promise<void> => {
    console.log('Funciona ingresar Sesion');
    var txtCorreo = (<HTMLInputElement>document.getElementById('txtCorreo'))
      .value;
    var txtContra = (<HTMLInputElement>document.getElementById('txtPassword'))
      .value;

    if (txtContra == '' || txtCorreo == '') {
      alert('Por Favor llene los datos de inicio de sesion');
    } else {
      this.validarUsuario(txtCorreo, txtContra);
    }
  };

  public validarUsuario = async (
    correo: string,
    contra: string
  ): Promise<void> => {
    console.log('Funciona validad usuario');
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:3312/api/v1/usuarios';
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = (e) => {
      var str = Http.responseText;
      var usuarios = JSON.parse(str);
      var valid = false;

      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo) {
          if (usuarios[i].contra === contra) {
            valid = true;
            break;
          }
        }
      }

      if (valid) {
        alert('usuario validado');
        window.location.href = 'http://localhost:3312/menu.html';
      } else {
        alert('usuario no validado');
      }
      Http.abort();
    }
    
    Http.onerror = (e) => {
      alert('No existe conexión con el servidor, por favor levantelo');
      Http.abort();
    }
    
  };
}
