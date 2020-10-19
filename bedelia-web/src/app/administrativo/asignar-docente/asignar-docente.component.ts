import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoDTO } from 'src/app/clases/curso-dto';
import { EdicionCursoDTO } from 'src/app/clases/edicion-curso-dto';
import { PersonaDTO } from 'src/app/clases/persona-dto';
import { UsuarioDTO } from 'src/app/clases/usuario-dto';
import { AdministrativosService } from 'src/app/servicios/administrativos.service';
import { EdicionesCursoService } from 'src/app/servicios/ediciones-curso.service';
import { SedesService } from 'src/app/servicios/sedes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-asignar-docente',
  templateUrl: './asignar-docente.component.html',
  styleUrls: ['./asignar-docente.component.css']
})
export class AsignarDocenteComponent implements OnInit {

  listaCurso: EdicionCursoDTO[];
  listaDocente: UsuarioDTO[];
  persona: PersonaDTO = new PersonaDTO;
  mostrarDatos: boolean = false;
  idSede: number;
  ciLogeado: string = JSON.parse(localStorage.getItem("loginData")).cedula;

  public formularioBusqueda: FormGroup;
  public formularioAsignar: FormGroup;

  constructor(private _snackBar: MatSnackBar,
    protected edicionCurServ: EdicionesCursoService,
    protected administrativoServ: AdministrativosService,
    protected sedeServ: SedesService,
    protected usuServ: UsuariosService) { }

  ngOnInit(): void {

    this.usuServ.getAllDocente().subscribe(
      (datos) => {
        this.listaDocente = datos;
      },
      (error) => {
        this.openSnackBar("Error al conectarse con la base de dato");
      }
    )

    this.administrativoServ.get(this.ciLogeado).subscribe(
      (datos) => {
        if (datos.id != null) {
          this.sedeServ.getCrsos(datos.id).subscribe(
            (datos) => {
              this.listaCurso = datos;
            },
            (error) => {
              this.openSnackBar("Error al traer los cursos de la base de dato");
            }
          )
        }
      }
    );

    this.formularioBusqueda = new FormGroup({
      ci: new FormControl('', [Validators.required]),
    });
    this.formularioAsignar = new FormGroup({
      curso: new FormControl('', [Validators.required]),
    })
  }

  buscar() {
    this.mostrarDatos = true;
    this.listaDocente.forEach(element => {
      if (element.id == this.formularioBusqueda.controls['ci'].value) {
        this.persona = element.persona;
      }
    });
  }

  asignar() {
    this.mostrarDatos = false;
    this.edicionCurServ.asignar(this.formularioAsignar.controls['curso'].value, this.formularioBusqueda.controls['ci'].value).subscribe(
      (datos) => {
      },
      (error) => {
        this.openSnackBar("Error al asignar el docente");
      }
    )
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Salir', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: "bottom",
    });
  }
}