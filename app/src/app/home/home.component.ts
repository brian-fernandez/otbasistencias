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


listUser(){
  this.router.navigateByUrl("home/lista-Usuario");
}
createUser(){
  this.router.navigateByUrl("home/nuevo-Usuario");
}


listAfiliado() {
  this.router.navigateByUrl("home/lista");
}
createAfiliado()
{
  this.router.navigateByUrl("home/nuevo");
}

reportes(){
  this.router.navigateByUrl("home/reportes");
}

listaPagos(){
  this.router.navigateByUrl("home/pagos");
}
createPagos(){
  this.router.navigateByUrl("home/nuevo-pago");
}

listEvent(){
  this.router.navigateByUrl("home/eventos");
}

createEvent(){
  this.router.navigateByUrl("home/nuevo-evento");
}

qr(){
  this.router.navigateByUrl("home/lector")
}


listProyect(){
  this.router.navigateByUrl("home/proyectos")
}
createProyect(){
  this.router.navigateByUrl("home/nuevo-proyecto")
}

closed(){
  localStorage.clear();
  this.router.navigateByUrl('/loading')

}

reporte(){
  this.router.navigateByUrl('home/reportes')
}
}
