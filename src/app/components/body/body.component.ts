import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  alumnos : Array<Alumno>;
  formularioAlumnos: FormGroup;
  display: boolean;
  submitted = false;

  constructor(private fb: FormBuilder, private aService: AlumnoService, private messageService: MessageService){
    this.alumnos = new Array<Alumno>()
    this.display = false
    this.formularioAlumnos = fb.group({
      numDocumento: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      nombre:
      new FormControl(
        '',
        [Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)]
      ),
      apellido:
      new FormControl(
        '',
        [Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)]
      ),
      correo: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    // Realiza la carga de datos
    this.getAlumnos();
    this.submitted = false;
  }

  //Crear alumno
  crearAlumno(){
    if(this.formularioAlumnos.valid){
      let alumnmo = new Alumno()
      alumnmo.numDocumento = this.formularioAlumnos.get('numDocumento')?.value;
      alumnmo.nombre = this.formularioAlumnos.get('nombre')?.value;
      alumnmo.apellido = this.formularioAlumnos.get('apellido')?.value;
      alumnmo.correoElectronico = this.formularioAlumnos.get('correo')?.value;

      this.aService.crearAlumno(alumnmo).subscribe(res => {
        this.getAlumnos()
        this.formularioAlumnos.reset();
      });
    }
  }

  //Get Alumnos
  getAlumnos(){
    this.aService.getAlumno().subscribe(res =>{
      this.alumnos = res;
    });
  }

  //Eliminar alumno
  eliminarAlumno(idAlumno: number){
    this.aService.eliminarAlumno(idAlumno).subscribe(res =>{
      this.getAlumnos();
    });
  }

  //Activa el dialogo
  activador(alumno: Alumno){
    this.formularioAlumnos.get('numDocumento')?.setValue(alumno.numDocumento);
    this.formularioAlumnos.get('nombre')?.setValue(alumno.nombre);
    this.formularioAlumnos.get('apellido')?.setValue(alumno.apellido);
    this.formularioAlumnos.get('correo')?.setValue(alumno.correoElectronico);

    this.display = !this.display;
  }

  //actualizar Alumno
  actualizarAlumno(){
    if(this.formularioAlumnos.valid){
      let alumnmo = new Alumno()
      alumnmo.numDocumento = this.formularioAlumnos.get('numDocumento')?.value;
      alumnmo.nombre = this.formularioAlumnos.get('nombre')?.value;
      alumnmo.apellido = this.formularioAlumnos.get('apellido')?.value;
      alumnmo.correoElectronico = this.formularioAlumnos.get('correo')?.value;

      this.aService.actualizarAlumno(alumnmo).subscribe(res => {
        this.getAlumnos()
        this.formularioAlumnos.reset();
        this.display = !this.display;
      });
    }
  }

  showError(field: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `El campo ${field} es obligatorio` });
  }
  onSubmit() {
    this.submitted = true;
    // Lógica para enviar el formulario
  }
}
