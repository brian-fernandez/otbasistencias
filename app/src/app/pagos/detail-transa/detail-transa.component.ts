import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keysecret } from 'src/app/config/secretKeys';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-transa',
  templateUrl: './detail-transa.component.html',
  styleUrls: ['./detail-transa.component.css']
})
export class DetailTransaComponent implements OnInit {
  data: any;
  checkList:any;
  id: any;
  private Key = Keysecret.key;
  constructor(
    private route: ActivatedRoute,
    private user:UserService,
    private encript:EncrDecrService,
    private router:Router
  ) { }

  ngOnInit() {
    this.checkList = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getId(this.id);
    });
  }

  getId(id){
    this.user.getIdTransac(id).subscribe(
      async (params:any) => {
        this.data = params[0]; 
        console.log(this.data);
        
      }
    )
  }

  success(){
    if (this.checkList) {
      return true;
    } else {
      return false;
    }
  }

  send(){
    
    let idRes = localStorage.getItem('dataUser');
    idRes = this.encript.get(this.Key,idRes);
    this.user.sendTransacc(this.id,idRes,this.data.total,this.data.id_user,JSON.parse(this.data.data_multas)).subscribe(
      async (params:any) => {
        this.router.navigateByUrl('home/pagos');
          
      }
    )
  }
}
