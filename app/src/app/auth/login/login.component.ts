import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keysecret } from 'src/app/config/secretKeys';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  private Key = Keysecret.key;
  login:any;

  constructor(
    private Encrypt :EncrDecrService,
    private router:Router
  ){

  }

  ngOnInit(){
    this.login = {

    }
  }

  loginSend(){
    console.log(this.login);

    localStorage.setItem('email',this.Encrypt.set(this.Key,this.login.email));
    localStorage.setItem('password',this.Encrypt.set(this.Key,this.login.password));
    this.router.navigateByUrl('/loading');
  }
}
