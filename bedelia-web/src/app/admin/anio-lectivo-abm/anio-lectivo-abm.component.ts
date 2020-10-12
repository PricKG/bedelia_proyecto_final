import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnioLectivoDTO } from 'src/app/clases/anio-lectivo-dto';
import { AnioLectivoService } from 'src/app/servicios/anio-lectivo.service';

@Component({
  selector: 'app-anio-lectivo-abm',
  templateUrl: './anio-lectivo-abm.component.html',
  styleUrls: ['./anio-lectivo-abm.component.css']
})
export class AnioLectivoABMComponent implements OnInit {
  soloLectura: boolean = true;

  public formulario: FormGroup;

  constructor(protected periodoServ: AnioLectivoService) { }

  ngOnInit(): void {

    this.formulario = new FormGroup({
      ini_1er_per_insc_exam: new FormControl('', [Validators.required]),
      fin_1er_per_insc_exam: new FormControl('', [Validators.required]),

      ini_1er_per_exam: new FormControl('', [Validators.required]),
      fin_1er_per_exam: new FormControl('', [Validators.required]),

      ini_1er_per_insc_lect: new FormControl('', [Validators.required]),
      fin_1er_per_insc_lect: new FormControl('', [Validators.required]),

      ini_1er_per_lect: new FormControl('', [Validators.required]),
      fin_1er_per_lect: new FormControl('', [Validators.required]),

      ini_2do_per_insc_exam: new FormControl('', [Validators.required]),
      fin_2do_per_insc_exam: new FormControl('', [Validators.required]),

      ini_2do_per_exam: new FormControl('', [Validators.required]),
      fin_2do_per_exam: new FormControl('', [Validators.required]),

      ini_2do_per_insc_lect: new FormControl('', [Validators.required]),
      fin_2do_per_insc_lect: new FormControl('', [Validators.required]),

      ini_2do_per_lect: new FormControl('', [Validators.required]),
      fin_2do_per_lect: new FormControl('', [Validators.required]),

      ini_3er_per_insc_exam: new FormControl('', [Validators.required]),
      fin_3er_per_insc_exam: new FormControl('', [Validators.required]),

      ini_3er_per_exam: new FormControl('', [Validators.required]),
      fin_3er_per_exam: new FormControl('', [Validators.required]),
    });

    /*this.periodoServ.get().subscribe(
      (datos)=>{
        this.cargaDeDatos(datos);
      },
      (error)=>{
        alert("Error");
      }
    );*/
  }

  crearPeriodo(){
    this.soloLectura = false;
    this.vaciarDatos();
  }

  cargaDeDatos(anio: AnioLectivoDTO) {
    this.formulario.controls['ini_1er_per_insc_exam'].setValue(anio.ini_1er_per_insc_exam);
    this.formulario.controls['fin_1er_per_insc_exam'].setValue(anio.fin_1er_per_insc_exam);

    this.formulario.controls['ini_1er_per_exam'].setValue(anio.ini_1er_per_exam);
    this.formulario.controls['fin_1er_per_exam'].setValue(anio.fin_1er_per_exam);

    this.formulario.controls['ini_1er_per_insc_lect'].setValue(anio.ini_1er_per_insc_lect);
    this.formulario.controls['fin_1er_per_insc_lect'].setValue(anio.fin_1er_per_insc_lect);

    this.formulario.controls['ini_1er_per_lect'].setValue(anio.ini_1er_per_lect);
    this.formulario.controls['fin_1er_per_lect'].setValue(anio.fin_1er_per_lect);

    this.formulario.controls['ini_2do_per_insc_exam'].setValue(anio.ini_2do_per_insc_exam);
    this.formulario.controls['fin_2do_per_insc_exam'].setValue(anio.fin_2do_per_insc_exam);

    this.formulario.controls['ini_2do_per_exam'].setValue(anio.ini_2do_per_exam);
    this.formulario.controls['fin_2do_per_exam'].setValue(anio.fin_2do_per_exam);

    this.formulario.controls['ini_2do_per_insc_lect'].setValue(anio.ini_2do_per_insc_lect);
    this.formulario.controls['fin_2do_per_insc_lect'].setValue(anio.fin_2do_per_insc_lect);

    this.formulario.controls['ini_2do_per_lect'].setValue(anio.ini_2do_per_lect);
    this.formulario.controls['fin_2do_per_lect'].setValue(anio.fin_2do_per_lect);

    this.formulario.controls['ini_3er_per_insc_exam'].setValue(anio.ini_3er_per_insc_exam);
    this.formulario.controls['fin_3er_per_insc_exam'].setValue(anio.fin_3er_per_insc_exam);

    this.formulario.controls['ini_3er_per_exam'].setValue(anio.ini_3er_per_exam);
    this.formulario.controls['fin_3er_per_exam'].setValue(anio.fin_3er_per_exam);
  }

  vaciarDatos() {
    this.formulario.controls['ini_1er_per_insc_exam'].setValue("");
    this.formulario.controls['fin_1er_per_insc_exam'].setValue("");

    this.formulario.controls['ini_1er_per_exam'].setValue("");
    this.formulario.controls['fin_1er_per_exam'].setValue("");

    this.formulario.controls['ini_1er_per_insc_lect'].setValue("");
    this.formulario.controls['fin_1er_per_insc_lect'].setValue("");

    this.formulario.controls['ini_1er_per_lect'].setValue("");
    this.formulario.controls['fin_1er_per_lect'].setValue("");

    this.formulario.controls['ini_2do_per_insc_exam'].setValue("");
    this.formulario.controls['fin_2do_per_insc_exam'].setValue("");

    this.formulario.controls['ini_2do_per_exam'].setValue("");
    this.formulario.controls['fin_2do_per_exam'].setValue("");

    this.formulario.controls['ini_2do_per_insc_lect'].setValue("");
    this.formulario.controls['fin_2do_per_insc_lect'].setValue("");

    this.formulario.controls['ini_2do_per_lect'].setValue("");
    this.formulario.controls['fin_2do_per_lect'].setValue("");

    this.formulario.controls['ini_3er_per_insc_exam'].setValue("");
    this.formulario.controls['fin_3er_per_insc_exam'].setValue("");

    this.formulario.controls['ini_3er_per_exam'].setValue("");
    this.formulario.controls['fin_3er_per_exam'].setValue("");
  }


  agregar() {
    let anio: AnioLectivoDTO = new AnioLectivoDTO();
    anio.ini_1er_per_insc_exam = this.formulario.controls['ini_1er_per_insc_exam'].value;
    anio.fin_1er_per_insc_exam = this.formulario.controls['fin_1er_per_insc_exam'].value;

    anio.ini_1er_per_exam = this.formulario.controls['ini_1er_per_exam'].value;
    anio.fin_1er_per_exam = this.formulario.controls['fin_1er_per_exam'].value;

    anio.ini_1er_per_insc_lect = this.formulario.controls['ini_1er_per_insc_lect'].value;
    anio.fin_1er_per_insc_lect = this.formulario.controls['fin_1er_per_insc_lect'].value;

    anio.ini_1er_per_lect = this.formulario.controls['ini_1er_per_lect'].value;
    anio.fin_1er_per_lect = this.formulario.controls['fin_1er_per_lect'].value;

    anio.ini_2do_per_insc_exam = this.formulario.controls['ini_2do_per_insc_exam'].value;
    anio.fin_2do_per_insc_exam = this.formulario.controls['fin_2do_per_insc_exam'].value;

    anio.ini_2do_per_exam = this.formulario.controls['ini_2do_per_exam'].value;
    anio.fin_2do_per_exam = this.formulario.controls['fin_2do_per_exam'].value;

    anio.ini_2do_per_insc_lect = this.formulario.controls['ini_2do_per_insc_lect'].value;
    anio.fin_2do_per_insc_lect = this.formulario.controls['fin_2do_per_insc_lect'].value;

    anio.ini_2do_per_lect = this.formulario.controls['ini_2do_per_lect'].value;
    anio.fin_2do_per_lect = this.formulario.controls['fin_2do_per_lect'].value;

    anio.ini_3er_per_insc_exam = this.formulario.controls['ini_3er_per_insc_exam'].value;
    anio.fin_3er_per_insc_exam = this.formulario.controls['fin_3er_per_insc_exam'].value;

    anio.ini_3er_per_exam = this.formulario.controls['ini_3er_per_exam'].value;
    anio.fin_3er_per_exam = this.formulario.controls['fin_3er_per_exam'].value;

    this.periodoServ.create(anio).subscribe(
      (datos) => {
        this.soloLectura = false;
        alert("Echo!");
      },
      (error) => {
        alert("Error");
      }
    );
  }
}
