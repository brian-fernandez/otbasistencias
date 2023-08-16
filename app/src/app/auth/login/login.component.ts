import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keysecret } from 'src/app/config/secretKeys';
import { UtilsService } from 'src/app/services/Utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  private Key = Keysecret.key;
  login:any;
  dataUser=

    {
      nombre:"Brian Fernandez Mercado",
      CI:"14696249",
      cargo:"Admin"
    }



  constructor(
    private Encrypt :EncrDecrService,
    private router:Router,
    private auth:AuthService,
    private utils:UtilsService
  ){

  }

  ngOnInit(){
    this.login = {

    }
  }

  loginSend(){

    this.auth.login(this.login.ci,this.login.password).subscribe(
      async (params:any) => {

          localStorage.setItem('dataUser',this.Encrypt.set(this.Key,params.user.id));
          localStorage.setItem('token',this.Encrypt.set(this.Key,params.access_token));
          this.utils.openSnackBar('Bienvenido ' + params.user.nombre);
          console.log('entro');

          this.router.navigateByUrl('/loading');

      }, (error) =>{
        if (error.error.message) {
          this.utils.openSnackBar(error.error.message);
        }else{

          this.utils.openSnackBar('Credenciales erroneas');
        }

      }
    )
  }
}
