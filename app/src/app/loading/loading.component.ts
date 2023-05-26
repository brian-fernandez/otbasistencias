import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  credential: any;
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.credential = {

    }
    this.init();

  }
  init() {
    if (this.credential.email && this.credential.token) {
      this.router.navigateByUrl('home')
    } else{
      this.router.navigateByUrl('sesion');
    }
  }
}
