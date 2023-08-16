import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor(
    private router:Router
  ) { }

  set(keys:any, value:any):any{
    try {
      var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),key,
    {
      keySize: 128/8,
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7

    });
    return encrypted.toString();
    } catch (error) {
        this.router.navigateByUrl('loading')
    }
  }

  get(keys:any,value:any):any{
   try {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var deecrypted = CryptoJS.AES.decrypt(value,key,
    {
      keySize: 128/8,
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7

    });
    return deecrypted.toString(CryptoJS.enc.Utf8);

   } catch (error) {
    this.router.navigateByUrl('loading')
   }

}
}
