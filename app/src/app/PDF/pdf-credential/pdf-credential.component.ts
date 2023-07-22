import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';

@Component({
  selector: 'app-pdf-credential',
  templateUrl: './pdf-credential.component.html',
  styleUrls: ['./pdf-credential.component.css']
})
export class PdfCredentialComponent implements OnInit {
  active: boolean;
  progress: number;
  repeatCount:any;
  constructor(private utils:UtilsService,private router:Router) { }
  data:any;
  ngOnInit() {
    this.data = {
      id:1,
      name:"Brian ",
      lastname:"Fernandez Mercado",
      email:"brian@gmail.com",
      ci:"14696249",
      addres:"Avenida Petrolera Km 3 1/2",
      addresnumber:"0000",
      street:"2",
      phone:"69489025",
      callphone:"694890256",
      photo:"./../../assets/img/avatar.jpg"

    }
  }

  download() {
    this.active = true;
    this.progress = -1;
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.utils.convertPDF('pdf',2);
        clearInterval(interval);
        this.active = false;
      }
    }, 100);
  }
  removed(){
    this.router.navigateByUrl('/home/profile/1');
  }

 generateRepeatArray(){
  return Array(this.repeatCount).fill(null);
 }
}
