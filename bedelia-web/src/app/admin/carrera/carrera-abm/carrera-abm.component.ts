import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaEstudioDTO } from 'src/app/clases/area-estudio-dto';
import { CursoDTO } from 'src/app/clases/curso-dto';
import { SedeDTO } from 'src/app/clases/sede-dto';
import { AreaEstudioService } from 'src/app/servicios/area-estudio.service';
import { CarreraService } from 'src/app/servicios/carrera.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { SedesService } from 'src/app/servicios/sedes.service';

export interface Isemestre {
  clave: number;
  cursos: CursoDTO[];
}

@Component({
  selector: 'app-carrera-abm',
  templateUrl: './carrera-abm.component.html',
  styleUrls: ['./carrera-abm.component.css']
})
export class CarreraABMComponent implements OnInit {
  listaSedes: SedeDTO[] = [];
  listaCurso: CursoDTO[] = [];
  listaCursoPrevias: CursoDTO[] = [];
  listaAreasEstudio: AreaEstudioDTO[];

  listaSedeSeleccionada: SedeDTO[] = [];
  listaAreaSeleccionada: AreaEstudioDTO[] = [];
  listaCursoSeleccionados: CursoDTO[] = [];
  listaSemestre: Isemestre[] = [];

  previaOcultar: boolean = false;
  contadorSemestres: number = 1;
  idCursoPrevia:number;

  public formulario: FormGroup;
  public formularioSede: FormGroup;
  public formularioArea: FormGroup;
  public formularioCurso: FormGroup;
  public formularioPrevia: FormGroup;

  constructor(protected carreraServ: CarreraService, protected sedeServ: SedesService, protected cursoServ: CursoService,
    protected areaServ: AreaEstudioService) { }

  ngOnInit(): void {

    this.areaServ.getAll().subscribe(
      (datos) => {
        this.listaAreasEstudio = datos;
      }
    );

    this.sedeServ.getAll().subscribe(
      (datos) => {
        this.listaSedes = datos;
      }
    );

    this.cursoServ.getAll().subscribe(
      (datos) => {
        this.listaCurso = datos;
      }
    );

    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });

    this.formularioArea = new FormGroup({
      area: new FormControl('', [Validators.required]),
      creditos: new FormControl('', [Validators.required]),
    });

    this.formularioSede = new FormGroup({
      sede: new FormControl('', [Validators.required]),
    });

    this.formularioCurso = new FormGroup({
      curso: new FormControl('', [Validators.required]),
    });

    this.formularioPrevia = new FormGroup({
      idPrevia: new FormControl('', [Validators.required]),
      tipoPrevia: new FormControl('', [Validators.required]),
    });
  }

  asignarSedes() {
    if (this.listaSedeSeleccionada.includes(this.formularioSede.controls['sede'].value)) {
      return;
    }

    this.listaSedeSeleccionada.push(this.formularioSede.controls['sede'].value);
    this.formularioSede.controls['sede'].setValue(undefined);
  }

  asignarArea() {
    if (this.listaAreaSeleccionada.includes(this.formularioArea.controls['area'].value)) {
      return;
    }
    let creditos: number = this.formularioArea.controls['creditos'].value

    this.formularioArea.controls['area'].value.creditos = creditos;
    this.listaAreaSeleccionada.push(this.formularioArea.controls['area'].value);

    this.formularioArea.controls['area'].setValue(undefined);
    this.formularioArea.controls['creditos'].setValue("");

  }

  asignarCurso() {
    if (this.listaCursoSeleccionados.includes(this.formularioCurso.controls['curso'].value)) {
      return;
    }

    this.listaCursoSeleccionados.push(this.formularioCurso.controls['curso'].value);
    this.formularioCurso.controls['curso'].setValue(undefined);
  }

  crearSemestre() {
    this.listaSemestre.push({
      clave: this.contadorSemestres,
      cursos: this.listaCursoSeleccionados
    });

    this.listaCursoSeleccionados.forEach(element => {
      this.listaCurso.splice(this.listaCurso.indexOf(element), 1);
    });

    this.contadorSemestres++;
    this.listaCursoSeleccionados = [];
    this.formularioCurso.controls['curso'].setValue(undefined);
  }

  cargarListaPrevia(idCurso: number, claveSemestre: number) {
    this.previaOcultar = true;
    this.listaCursoPrevias=[];
    this.idCursoPrevia = idCurso;
    this.listaSemestre.forEach(element => {
      if(element.clave < claveSemestre){
        element.cursos.forEach(cursos => {
          this.listaCursoPrevias.push(cursos);
        });
      }

    });

    console.log(idCurso, claveSemestre);
  }

  crearPrevia(id:number){
    /*Esta funcion tiene todo para crear una previa*/
    this.idCursoPrevia = undefined;
  }

}