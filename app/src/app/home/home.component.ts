import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, interval } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { EncrDecrService } from '../services/encr-decr.service';
import { Keysecret } from '../config/secretKeys';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private Key = Keysecret.key;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  data: any;
  dataEvent: any;
  verify: boolean;
  on: boolean;
  adentro: any;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, private serviceauth: AuthService,
    private location: Location,
    private userService: UserService,
    private encryp:EncrDecrService) { }


  ngOnInit() {
    this.userid();
    this.adentro = true;
    this.verify = false;
    this.getUser();
    this.openWidget();

    console.log('hola');

  }


  dash() {
    this.router.navigateByUrl("home/dashboard");
this.openWidget();
  }


  listUser() {
    this.router.navigateByUrl("home/lista-Usuario");
this.openWidget();
  }
  createUser() {
    this.router.navigateByUrl("home/nuevo-Usuario");
this.openWidget();
  }


  listAfiliado() {
    this.router.navigateByUrl("home/lista");
this.openWidget();
  }
  createAfiliado() {
    this.router.navigateByUrl("home/nuevo");
this.openWidget();
  }

  reportes() {
    this.router.navigateByUrl("home/reportes");
this.openWidget();
  }

  listaPagos() {
    this.router.navigateByUrl("home/pagos");

  }
  createPagos() {
this.openWidget();
    this.router.navigateByUrl("home/nuevo-pago");
  }

  listEvent() {
    this.router.navigateByUrl("home/eventos");
this.openWidget();
  }

  createEvent() {
    this.router.navigateByUrl("home/nuevo-evento");
this.openWidget();

  }

  qr() {
    this.router.navigateByUrl("home/lector");
this.openWidget();
  }


  listProyect() {
    this.router.navigateByUrl("home/proyectos");
this.openWidget();
  }
  createProyect() {
    this.router.navigateByUrl("home/nuevo-proyecto");
this.openWidget();
  }

  closed() {
    this.adentro = false;
    localStorage.clear();
    this.router.navigateByUrl('/loading');

  }

  reporte() {
    this.router.navigateByUrl('home/reportes');
this.openWidget();
  }

  getUser() {
    this.data = this.serviceauth.get();
this.openWidget();

  }


  viewProfile(id) {
    this.router.navigate(['home/perfil', id]);
    this.openWidget();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('');
  }

  setrouter (){
    console.log('entro');

    const currentUrl = this.router.url;
    const patterns = [
      /^\/home\/evento\//,      // Patrón 1: "/home/evento/"
      /^\/home\/pdf-credencial\//,      // Patrón 1: "/home/evento/"
      /^\/home\/perfil\//,      // Patrón 1: "/home/evento/"
      /^\/home\/edicion\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-Usuario\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo\//,      // Patrón 1: "/home/evento/"
      /^\/home\/reportes\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-pago\//,      // Patrón 1: "/home/evento/"
      /^\/home\/lector\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-pago\//,      // Patrón 1: "/home/evento/"
      /^\/otropatron1\//,       // Patrón 2: "/otropatron1/"
      /^\/otropatron2\/[0-9]+/  // Patrón 3: "/otropatron2/" seguido de un número
    ];

    setTimeout(() => {
      localStorage.setItem('router',currentUrl);
      console.log(this.on);

      this.setrouter();

       const matchesPattern = patterns.some(pattern => pattern.test(currentUrl));

    if (matchesPattern) {

      this.verify = true;
    } else {
      this.verify = false;
    }
    }, 1000);
  }

  openWidget() {
    console.log('entro 22');

    const patterns = [
      /^\/home\/evento\//,      // Patrón 1: "/home/evento/"
      /^\/home\/pdf-credencial\//,      // Patrón 1: "/home/evento/"
      /^\/home\/perfil\//,      // Patrón 1: "/home/evento/"
      /^\/home\/edicion\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-Usuario\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo\//,      // Patrón 1: "/home/evento/"
      /^\/home\/reportes\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-pago\//,      // Patrón 1: "/home/evento/"
      /^\/home\/lector\//,      // Patrón 1: "/home/evento/"
      /^\/home\/nuevo-pago\//,      // Patrón 1: "/home/evento/"
      /^\/otropatron1\//,       // Patrón 2: "/otropatron1/"
      /^\/otropatron2\/[0-9]+/  // Patrón 3: "/otropatron2/" seguido de un número
    ];




    interval(10000).subscribe(() => {
      this.userService.getEventosEnCurso().subscribe(
        (params: any) => {
          this.dataEvent = params.eventos_en_curso;
          const currentUrl = this.router.url;
          const matchesPattern = patterns.some(pattern => pattern.test(currentUrl));
          console.log(matchesPattern && this.dataEvent.length > 0);

          if ( this.dataEvent.length > 0 && !matchesPattern) {
            this.on = true;
          } else {
            this.on = false;
          }
        },
        (error) => {
          console.error('Error al obtener eventos en curso:', error);
        }
      );
    });



  }

  userid(){
      let id = localStorage.getItem('dataUser');
      id = this.encryp.get(this.Key,id);
    this.userService.getId(id).subscribe(
      async (params:any) => {
        this.data = params.user;
      }
    )
  }

}
