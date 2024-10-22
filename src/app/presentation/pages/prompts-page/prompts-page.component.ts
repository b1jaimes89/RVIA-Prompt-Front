import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BitoService } from 'app/presentation/services/bito.service';
import { TypingLoaderComponent } from "../../components/typingLoader/typingLoader.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompts-page',
  standalone: true,
  imports: [ReactiveFormsModule, TypingLoaderComponent, CommonModule],
  templateUrl: './prompts-page.component.html',
  styleUrl: './prompts-page.component.css'
})
export default class PromptsPageComponent {

  optionSchemas = [
    {id: 0, value: 'RTF'},
    {id: 1, value: 'TAO'},
    {id: 2, value: 'BAB'},
    {id: 3, value: 'CARE'}
  ];

  labels = [
    ['R: Rol', 'T: Tarea', 'F: Formato'],
    ['T: Tarea', 'A: Acción', 'O: Objetivo'],
    ['B: Antes', 'A: Despues', 'B: Puente'],
    ['C: Contexto', 'A: Acción', 'R: Resultados', 'E: Ejemplos'],
  ];

  form!: FormGroup;
  file: File | undefined;
  response: string | null =  null;
  public isLoading = signal(false);
  public isError = signal(false);
  errorMessage: string | null = null;
  
  private bitoService = inject( BitoService );
  private fb = inject( FormBuilder );

  ngOnInit(): void {
    this.form = this.fb.group({
      option: [''],
      textBoxes: this.fb.array([]),
      file: [null, Validators.required ]
    });

    this.form.get('option')?.valueChanges.subscribe(value => {
      this.form.controls['file'].setValue(null);
      this.response = null;
      if(this.form.controls['option'].value !== '' ){
        this.updateTextBoxes(+value);
      }
    })
  }

  get textBoxes(): FormArray {
    return this.form.get('textBoxes') as FormArray;
  }

  updateTextBoxes(value: number){
    const numberBoxes = value === 3 ? 4 : 3;

    const newTextBoxes = this.fb.array(
      Array.from({ length: numberBoxes }, () =>
        this.fb.control('', Validators.required)
      )
    );

    this.form.setControl('textBoxes', newTextBoxes);
  }

  labelText(index: number){
    const labels = this.labels[this.form.get('option')?.value];
    return labels[index];     
  }

  handleSelectedFile( event: any ) {
    const file = event.target.files.item(0);
    this.form.controls['file'].setValue(file);
  }

  onSubmit() {
    if(this.form.invalid) return;

    const file = this.form.controls['file'].value;
    let prompt = '';
    const boxes = this.textBoxes.controls;
    boxes.forEach(box => prompt += `\n  ${box.value}` );
    
    this.isError.set(false);
    this.isLoading.set(true);
    this.bitoService.useBitoClIWithFile( prompt, file )
      .subscribe({
        next: (resp) => {
          this.response = resp.response;
          this.isLoading.set(false);
        },
        error: (e) => {
          this.errorMessage = `${e.status} - ${e.error.message}`;
          this.isLoading.set(false);
          this.isError.set(true);
        }
      });
  }

  resetForm(): void {    
    this.textBoxes.clear();

    this.form.reset({
      option: '',
      file: null,
      textBoxes: []
    });

    this.form.setControl('textBoxes', this.fb.array([]));
    this.response = null;
    this.errorMessage = null;
    this.isError.set(false);
  }
}
