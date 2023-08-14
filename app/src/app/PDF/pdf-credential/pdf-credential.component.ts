import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { UserService } from 'src/app/services/user.service';
import { Keysecret } from "./../../config/secretKeys";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pdf-credential',
  templateUrl: './pdf-credential.component.html',
  styleUrls: ['./pdf-credential.component.css']
})
export class PdfCredentialComponent implements OnInit {
  private Key = Keysecret.key;
  active: boolean;
  progress: number;
  repeatCount:any;
  id: any;
  myAngularxQrCode: any;
  imagenDataUrl: string;
  constructor(private utils:UtilsService,
    private router:Router,
    private route: ActivatedRoute,
    private UserService:UserService,
    private encript:EncrDecrService,
    private http:HttpClient) { }
  data:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id = params['id'];
    });
    this.getUser(this.id);

    // this.data = {
    //   id:1,
    //   name:"Brian ",
    //   lastname:"Fernandez Mercado",
    //   email:"brian@gmail.com",
    //   ci:"14696249",
    //   addres:"Avenida Petrolera Km 3 1/2",
    //   addresnumber:"0000",
    //   street:"2",
    //   phone:"69489025",
    //   callphone:"694890256",
    //   photo:"./../../assets/img/avatar.jpg"

    // }



  }

  getUser(id){
    this.UserService.getId(id).subscribe(
      async (params:any) => {
          this.data = params.user;

          this.myAngularxQrCode = this.encript.set(this.Key,this.data.id);

          this.http.get('https://api.otb.otbuniversitarioalto.us/'+ this.data?.src_foto , { responseType: 'blob' })
          .subscribe((blob: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.imagenDataUrl = reader.result as string;
            };
            reader.readAsDataURL(blob);
          });
      }
    )
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
