import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

// Importa tu modelo Alumno aquí si es necesario
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let mockAlumnoService: any; // Define un mock para AlumnoService
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockAlumnoService = jasmine.createSpyObj('AlumnoService', ['crearAlumno']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [BodyComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AlumnoService, useValue: mockAlumnoService },
        { provide: MessageService, useValue: mockMessageService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an alumno', () => {
    const alumno: Alumno = {
      numDocumento: 2020,
      nombre: 'Noemi',
      apellido: 'Oorts',
      correoElectronico: 'Hilda.oo@example.com',
    };

    mockAlumnoService.crearAlumno.and.returnValue(of(true)); // Simula la respuesta del servicio

    component.formularioAlumnos.setValue(alumno);
    component.crearAlumno();

    expect(mockAlumnoService.crearAlumno).toHaveBeenCalledWith(alumno);
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Alumno creado correctamente',
    });
    expect(component.getAlumnos).toHaveBeenCalled(); // Si existe un método getAlumnos para actualizar la lista de alumnos
  });
});
