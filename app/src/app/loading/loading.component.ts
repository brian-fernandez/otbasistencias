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
    setTimeout(() => {
      this.init();
    }, 2000);


  }
  init() {

    try {
      const email = this.EncrypDescryp.set(this.Key, localStorage.getItem('email')) || false;
      const password = this.EncrypDescryp.set(this.Key, localStorage.getItem('password')) || false;
      console.log(email + '  ' + password);

      if (email && password) {
        return this.router.navigateByUrl('/home/dashboard');

      }
      console.log('salio');

      return this.router.navigateByUrl('/sesion');
    } catch (error) {
      return this.router.navigateByUrl('/sesion');
    }

  }
}

