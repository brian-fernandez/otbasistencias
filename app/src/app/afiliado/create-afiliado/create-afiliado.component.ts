import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-afiliado',
  templateUrl: './create-afiliado.component.html',
  styleUrls: ['./create-afiliado.component.css']
})
export class CreateAfiliadoComponent {
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
