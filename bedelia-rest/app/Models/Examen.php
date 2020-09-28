<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $table = "examen";

    protected $fillable = [
        acta_confirmada, fecha,
    ];

	// devuelve uno
    public function curso() {
        return $this->belongsTo('App\Models\Curso');
    }

	// devuelve uno
    public function periodoExamen() {
        return $this->belongsTo('App\Models\PeriodoExamen');
    }

	// devuelve coleccion
    public function estudiantes() {
        return $this->belongsToMany('App\Models\Estudiante');
    }

	// devuelve uno
    public function docente() {
        return $this->belongsTo('App\Models\Docente');
    }
}
