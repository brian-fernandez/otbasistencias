import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from './services/encr-decr.service';
import { Keysecret } from './config/secretKeys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private Key = Keysecret.key;
  title = 'OTB UNIVERSITARIO ALTO';
  sesion:any;
  constructor(
    private Encryp:EncrDecrService,
    private router:Router
  ){

  }
  ngOnInit() {
    this.getdata();
  }

  ionViewDidEnter(){
    this.getdata();


  }
  getdata(){
    try {
      const email = this.Encryp.set(this.Key, localStorage.getItem('email')) || false;
      const password = this.Encryp.set(this.Key, localStorage.getItem('password')) || false;


      if (email && password) {
        return this.sesion = true;

      }


      return this.sesion = false;
    } catch (error) {
      return   this.sesion = false;
    }

  }



}
