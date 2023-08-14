import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  data: any;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private serviceauth:AuthService) { }


ngOnInit(){
  this.getUser();
}

  dash() {
    this.router.navigateByUrl("/dashboard");
  }

  closed(){
    localStorage.clear();
    this.router.navigateByUrl('/loading')

  }

  getUser(){
    this.data = this.serviceauth.get();
   

  }
}
