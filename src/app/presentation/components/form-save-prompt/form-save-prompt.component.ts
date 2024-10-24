import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StarRatingComponent } from "@components/index";
import { PromptService } from '../../services/prompt.service';
import { Language, Schema } from '@interfaces/index';

@Component({
  selector: 'form-save-prompt',
  standalone: true,
  imports: [StarRatingComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-save-prompt.component.html',
  styleUrl: './form-save-prompt.component.css'
})
export class FormSavePromptComponent implements OnInit {
  @Input() prompt: string = '';
  @Input() schema!: Schema;

  lenguagesOps: Language[] = [
    {idu_lenguaje: 1, nom_lenguaje: 'JAVA'},
    {idu_lenguaje: 2, nom_lenguaje: 'JAVASCRIPT'},
    {idu_lenguaje: 3, nom_lenguaje: 'PHP'},
    {idu_lenguaje: 4, nom_lenguaje: 'PYTHON'},
  ];

  form!: FormGroup;
  
  private promptService = inject( PromptService );
  private fb = inject( FormBuilder );

  ngOnInit(): void {
    this.form = this.fb.group({
      language: ['', [Validators.required]],
      rating: [0, [Validators.required]],
      comments: ['', [Validators.required,Validators.minLength(5)]]
    });   
  }

  onSubmit(): void {
    if(this.form.invalid) return;
    
    const { language,...formInfo } = this.form.value;

    const infoToSave = {
      ...formInfo,
      language: +language,
      schema: this.schema.id,
      body: this.prompt
    }

    // TODO llamada al servicio para guardarlo
    this.promptService.savePrompt(infoToSave);

    // console.log(infoToSave);
  }

  onCancel(): void {
    this.form.reset({
      language: '',
      rating: 0,
      comments: ''
    });
  }
}