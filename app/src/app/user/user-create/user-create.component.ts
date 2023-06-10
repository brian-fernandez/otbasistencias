import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit{

  data:any
  imagenUrl!: SafeUrl;
  imagenBase64!: string;
  constructor(private sanitizer: DomSanitizer){

  }
  ngOnInit(){
   this.data = {

   }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imagenBase64 = reader.result as string;
        this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(this.imagenBase64);
      };

      reader.readAsDataURL(file);
    }
  }

  
}
