import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarreraDTO } from '../clases/carrera-dto';
import { EscolaridadDTO } from '../clases/escolaridad-dto';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiURL: string = environment.apiURL + '/estudiantes';

  constructor(protected http:HttpClient) { }

  getCarreras(ci:string){
    return this.http.get<CarreraDTO[]>(this.apiURL + "/"+ ci+"/carreras/");
  }

  justificarInasistencia(ciEstudiante:string, fechaInicio:string, fechaFin:string){
    return this.http.put(this.apiURL + '/' + ciEstudiante + "/asistencias/",{fecha_inicio:fechaInicio, fecha_fin:fechaFin});
  }

  getEscolaridad(ci:string, idCarrera: number){
    return this.http.get<EscolaridadDTO>(this.apiURL + "/"+ ci+"/escolaridad/"+idCarrera);
  }

  getEscolaridadPDF(ci:string, idCarrera: number){
    window.open(this.apiURL + "/" + ci + "/escolaridad/" + idCarrera + "/pdf")
  }

  getEscolaridadPDFCodigo(codigo:string){
    window.open(this.apiURL + "/escolaridad/"+ codigo);
  }

  getEscolaridadPDFExiste(codigo:string){
    return this.http.get(this.apiURL + "/escolaridad/"+ codigo + "/existe");
  }
}