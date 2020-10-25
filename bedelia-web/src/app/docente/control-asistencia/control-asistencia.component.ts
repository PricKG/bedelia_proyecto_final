import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CursoDTO } from 'src/app/clases/curso-dto';
import { EdicionCursoDTO } from 'src/app/clases/edicion-curso-dto';
import { CursoService } from 'src/app/servicios/curso.service';
import { EdicionesCursoService } from 'src/app/servicios/ediciones-curso.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-control-asistencia',
  templateUrl: './control-asistencia.component.html',
  styleUrls: ['./control-asistencia.component.css']
})
export class ControlAsistenciaComponent implements OnInit {
  listaCurso: EdicionCursoDTO[] = [];
  mostrar:boolean = false;

   // columnas que se mostraran en la tabla
   columnasAMostrar: string[] = ['cedula', 'nombre', 'apellido', 'fecha', 'accion'];
   // objeto que necesita la tabla para mostrar el contenido
   usuariosDataSource = new MatTableDataSource([]);

  constructor(private _snackBar: MatSnackBar, protected usuServ: UsuariosService,protected edicionServ: EdicionesCursoService) { }

  ngOnInit(): void {
    this.edicionServ.getEdicionesDocentes(this.usuServ.obtenerDatosLoginAlmacenado().cedula).subscribe(
      (datos) => {
        this.listaCurso = datos;
      }, (error) => {
        this.openSnackBar("No se pudo cargar los cursos desde la base de dato");
      }
    );

    this.usuServ.getAll().subscribe(
      (datos) => {
        this.usuariosDataSource.data = datos;
      }, (error) => {
        this.openSnackBar("No se pudo cargar los cursos desde la base de dato");
      }
    );
  }

  confirmar(id:number){
    this.mostrar = true;
    console.log(id);
  }

  asistio(id:string){
    //Asistió = 1, Llegada tarde = 0.5, No asistió = 0
  }
  
  noAsistio(id:string){
    //Asistió = 1, Llegada tarde = 0.5, No asistió = 0
  }
  
  mediaFalta(id:string){
    //Asistió = 1, Llegada tarde = 0.5, No asistió = 0
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Salir', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: "bottom",
    });
  }
}
