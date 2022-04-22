import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' //nivel global de la app
})
export class GifsService {

  private _historial: string[] = [];
  private _apiKey: string = "F75JrhegvnsD454fOjGOBtPyQ9uPCWVX";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || []
  }

  //Insertar valores al historial
  agregarGifs( busqueda:string ){
    //Todo guardado en minuscula
    busqueda = busqueda.trim().toLocaleLowerCase();
    // voy a insertar la busqueda si NO está incluida la palabra
    if( !this._historial.includes(busqueda)){
      this._historial.unshift(busqueda);
      this._historial = this._historial.splice(0,10); //solo se admiten 10 elementos
      localStorage.setItem("historial",JSON.stringify(this._historial));
    } 

    const params = new HttpParams().
          set("api_key", this._apiKey)
         .set("limit", "10")
         .set("q", busqueda);


    //El tipo del get va a traer una información que luce como la interfaz <SearchGIFResponse>
    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, {params}).
    subscribe((resp) =>{
      this.resultados = resp.data;
      localStorage.setItem("resultados",JSON.stringify(this.resultados));
    });
  
  }
}
