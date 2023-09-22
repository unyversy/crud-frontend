import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  rutaGlobal = 'http://localhost:8080/alumno/'

  constructor(private http: HttpClient) { }

  //Crear alumno
  crearAlumno(alumno: Alumno){
    return this.http.post<Alumno>(this.rutaGlobal + 'nuevo', alumno, {
      observe: 'response'
    })
  }

  //Obtener alumnos

  getAlumno(){
    return this.http.get<Alumno[]>(this.rutaGlobal + 'mostrar')
  }

  //Actualizar alumno
  actualizarAlumno(alumno: Alumno){
    return this.http.post<Alumno>(this.rutaGlobal + 'update', alumno, {
      observe: 'response'
    })
  }

  //Eliminar alumnos
  eliminarAlumno(numDocumento: number){
    return this.http.post<Boolean>(this.rutaGlobal + numDocumento, {
      observe: 'response'
    })
  }

}
