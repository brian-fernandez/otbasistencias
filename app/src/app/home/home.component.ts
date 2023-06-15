import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,
  private router: Router) { }



dash() {
  this.router.navigateByUrl("home/dashboard");
}
listUser() {
  this.router.navigateByUrl("home/lista-usuarios");
}
createUser()
{
  this.router.navigateByUrl("home/nuevo-usuario");
}


createEvent(){
  this.router.navigateByUrl("home/crear-evento");
}

closed(){
  localStorage.clear();
  this.router.navigateByUrl('/loading')

}
}
