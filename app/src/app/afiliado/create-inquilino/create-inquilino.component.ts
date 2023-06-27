import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-create-inquilino',
  templateUrl: './create-inquilino.component.html',
  styleUrls: ['./create-inquilino.component.css']
})
export class CreateInquilinoComponent {

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  data:any
  imagenUrl!: SafeUrl;
  imagenBase64!: string;
  myControl = new FormControl('');
  options: string[] = ['14696249', '54696249', '45366249','4535249','4536649','4536749','45365449','4537345249','453676449','455235249','6565366249','445366249'];

  filteredOptions!: Observable<string[]>;
  id: any;

  
  constructor(private sanitizer: DomSanitizer){

  }
  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onOptionSelected(data:any){
    console.log(data.option.value);
    this.id = data.option.value;
    
  }


}