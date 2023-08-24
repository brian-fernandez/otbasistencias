import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private eventosEnCursoSubject = new BehaviorSubject<any[]>([]);
  eventosEnCurso$: Observable<any[]> = this.eventosEnCursoSubject.asObservable();

  constructor(private userService: UserService) {}

  actualizarEventosEnCurso() {
    this.userService.getEventosEnCurso().subscribe(eventos => {
      this.eventosEnCursoSubject.next(eventos);
    });
  }



}
