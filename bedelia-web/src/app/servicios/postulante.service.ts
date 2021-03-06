import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostulanteDTO } from '../clases/postulante-dto';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  private apiURL: string = environment.apiURL + '/postulantes';

  constructor(protected http: HttpClient) { }

  get(id: number) {
    return this.http.get<PostulanteDTO>(this.apiURL + '/' + id);
  }

  create(datos: PostulanteDTO) {
    return this.http.post<PostulanteDTO>(this.apiURL, datos);
  }

  aceptar(id : number) {
    return this.http.post<PostulanteDTO>(this.apiURL + "/" + id + "/aceptar", null);
  }

  notificar(id : number, elmensaje:string) {
    return this.http.post<PostulanteDTO>(this.apiURL + "/" + id + "/notificar", {mensaje: elmensaje});
  }

  rechasar(id : number) {
    return this.http.delete<PostulanteDTO>(this.apiURL + "/" + id);
  }
}
