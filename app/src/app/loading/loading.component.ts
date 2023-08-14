import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrDecrService } from '../services/encr-decr.service';
import { Keysecret } from '../config/secretKeys';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  private Key = Keysecret.key;
  credential: any;
  constructor(
    private router: Router,
    private EncrypDescryp: EncrDecrService
  ) {

  }

  ngOnInit() {
    this.credential = {

    }
  this.init();


  }
  init() {


    try {
      const email =  localStorage.getItem('dataUser') || false;
      const password = localStorage.getItem('token') || false;
      if (email && password) {
        return this.router.navigateByUrl('/home/dashboard');
      }
      return this.router.navigateByUrl('/sesion');
    } catch (error) {
      return this.router.navigateByUrl('/sesion');
    }

  }
}

