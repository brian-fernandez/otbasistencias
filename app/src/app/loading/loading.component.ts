import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrDecrService } from '../services/encr-decr.service';
import { Keysecret } from '../config/secretKeys';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  private Key = Keysecret.key;
  credential: any;
  very: any;
  constructor(
    private router: Router,
    private EncrypDescryp: EncrDecrService,private userService:UserService
  ) {

  }

  ngOnInit() {
    this.credential = {

    }
  this.init();


  }
  init() {
    let id;
    id = this.EncrypDescryp.get(this.Key, localStorage.getItem('dataUser'));
    this.userService.verificarUsuario(id).subscribe(
      async (params: any) => {
        this.very = params;
        if (this.very) {
          console.log(':p');
          this.router.navigateByUrl('home/dashboard');
        } else {
          console.log('no entro');
          this.router.navigateByUrl('/sesion');
        }
      },
      (error) => {
        console.error('Error al verificar usuario:', error);
        this.router.navigateByUrl('/sesion');
      }
    );
  }




  //   try {
  //     const email =  localStorage.getItem('dataUser') || false;
  //     const password = localStorage.getItem('token') || false;
  //     if (email && password) {
  //       return this.router.navigateByUrl('/home/dashboard');
  //     }
  //     return this.router.navigateByUrl('/sesion');
  //   } catch (error) {
  //     return this.router.navigateByUrl('/sesion');
  //   }

  // }
}

