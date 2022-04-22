import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  get historial(){
    return this.gifsService.historial;
  }
 
  
  constructor( private gifsService:GifsService) { }

  buscar( elegido:string){
    /*como ya hemos hecho la validación de si dos terminos son iguales,
    entonces no se va a volver a agregar el gif*/
    this.gifsService.agregarGifs(elegido);
    
  }

}
