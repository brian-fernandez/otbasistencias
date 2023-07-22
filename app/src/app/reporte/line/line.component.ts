import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  view:any= [400, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  yAxisLabel: string = 'Cantidad';
  timeline: boolean = true;
  multi: { name: string; series: { name: string; value: number; }[]; }[];
  
  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};
  constructor() { 
    this.view = [innerWidth / 2.5, 400];
  }

  ngOnInit() {
    this.multi = [
      {
        "name": "Donación",
        "series": [
          {
            "name": "Enero",
            value: 100
          },
          {
            "name": "Marzo",
            value: 460
          },
          {
            "name": "Abril",
            value: 180
          }
          ,
          {
            "name": "Mayo",
            value: 230
          }
          ,
          {
            "name": "Junio",
            value: 340
          }
          ,
          {
            "name": "Julio",
            value: 580
          }
          ,
          {
            "name": "Agosto",
            value: 609
          }
        ]
      },
    
     
    ];
  }

  onResize(event:any) {
    this.view = [event?.target.innerWidth / 2.5, 400];
}

}
