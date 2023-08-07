import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface datos {
  texto: string;
  tipo: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  data: datos;
  aceptar:'si'
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: datos,
  ) { }

  ngOnInit() {
    this.data = this.dataDialog;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 
}
