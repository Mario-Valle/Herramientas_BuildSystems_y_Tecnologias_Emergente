import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";

@Injectable()
export class ProductosService {

  constructor(private http: Http) { }

  obtenerProductos(){
    return this.http.get("https://tienda-501bc.firebaseio.com/productos/.json")
      .map((res: Response) => {
      	console.log(res.json());
      	return res.json();
      });
  }

  obtenerProductoPorId(id:number){
     //return this.http.get("https://tienda-501bc.firebaseio.com/productos/" + (id - 1) + "/.json")
     return this.http.get("https://tienda-501bc.firebaseio.com/productos/" + (id) + "/.json")
      .map((res: Response) => res.json());
  }
}
