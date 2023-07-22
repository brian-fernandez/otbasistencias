import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  single: any[];
  view:any= [700, 300];
  viewtwo:any= [300, 300];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  tooltipTemplate : boolean = false;
  timeline: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  data1:any;
  // colorScheme = {
  //   domain: ['#3f51b5', '#e82828']
  // };

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Asistencias';

  animations: boolean = true;



  // colorSchemetwo = {
  //   domain: ['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']
  // };
  multi:any;

  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};
  constructor() { 
    
  }

  ngOnInit() {
    this.data1  = [
      {
        name: 'Afiliado',
        value: 209,
      },
      {
        name: 'Inquilino',
        value: 13,
      },
    ];

    this.single = [
      {
        "name": "Enero",
        "value": 230
      },
      {
        "name": "Febrero",
        "value": 100
      },
      {
        "name": "Marzo",
        "value": 167
      }
      
    ];
   
   
  }
  onResize(event:any) {
    this.view = [event?.target.innerWidth / 2.5, 400];
}

}
