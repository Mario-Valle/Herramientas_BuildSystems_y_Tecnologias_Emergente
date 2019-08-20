import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx"

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(){
	return this.http.get("https://tienda-501bc.firebaseio.com/usuarios/.json")

      .map((res: Response) => res.json());
  }
}
