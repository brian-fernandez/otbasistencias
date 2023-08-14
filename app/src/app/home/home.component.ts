import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';


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
  data: any;
  dataEvent: any;
  verify: boolean;
  on: boolean;
  adentro: any;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, private serviceauth: AuthService,
    private location: Location,
    private userService: UserService) { }


  ngOnInit() {
    this.adentro = true;
    this.verify = false;
    this.getUser();
    this.openWidget();
  }


  dash() {
    this.router.navigateByUrl("home/dashboard");
  }


  listUser() {
    this.router.navigateByUrl("home/lista-Usuario");
  }
  createUser() {
    this.router.navigateByUrl("home/nuevo-Usuario");
  }


  listAfiliado() {
    this.router.navigateByUrl("home/lista");
  }
  createAfiliado() {
    this.router.navigateByUrl("home/nuevo");
  }

  reportes() {
    this.router.navigateByUrl("home/reportes");
  }

  listaPagos() {
    this.router.navigateByUrl("home/pagos");
  }
  createPagos() {
    this.router.navigateByUrl("home/nuevo-pago");
  }

  listEvent() {
    this.router.navigateByUrl("home/eventos");
  }

  createEvent() {
    this.router.navigateByUrl("home/nuevo-evento");
  }

  qr() {
    this.router.navigateByUrl("home/lector")
  }


  listProyect() {
    this.router.navigateByUrl("home/proyectos")
  }
  createProyect() {
    this.router.navigateByUrl("home/nuevo-proyecto")
  }

  closed() {
    this.adentro = false;
    localStorage.clear();
    this.router.navigateByUrl('/loading')

  }

  reporte() {
    this.router.navigateByUrl('home/reportes')
  }

  getUser() {
    this.data = this.serviceauth.get();

  }


  viewProfile(id) {
    this.router.navigate(['home/perfil', id]);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('');
  }


  openWidget() {
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
    const matchesPattern = patterns.some(pattern => pattern.test(currentUrl));

    if (matchesPattern) {

      this.verify = true;
    } else {
      this.verify = false;
    }
    if (this.adentro) {
      setTimeout(() => {

        this.userService.getEventosEnCurso().subscribe(async (params: any) => {
          this.dataEvent = params.eventos_en_curso;
          if(!this.verify && this.dataEvent.length > 0){
            this.on = true;
          }else{
            this.on = false;
          }

          this.openWidget();
        }, (error) => {

        })

    }, 1000);
    }else{

    }




  }
}
