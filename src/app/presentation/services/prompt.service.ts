import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'environments/environment';
import { InfoToSavePrompt } from '@interfaces/index';

export interface ResponseBito{
  response: string
}
@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private readonly baseUrl = environment.baseURL;
  private http = inject(HttpClient);
  
  usePrompt(prompt: string): Observable<ResponseBito>{
    const data = { prompt };
    return this.http.post<ResponseBito>(`${this.baseUrl}/bito/base`,data);
  }

  usePromptClIWithFile(prompt: string, file: File): Observable<ResponseBito> {
    const formData = new FormData();
    formData.append('prompt', JSON.stringify(prompt));
    formData.append('file', file,file.name);

    // return this.http.post<ResponseBito>(`${this.baseUrl}/bito/file`,formData);
    return of({ 
        response: `"**Issues:**
        - Use of non-strict variable declarations.
        - Function parameters and return types are not typed.
        - The array() construct is outdated; use short array syntax [] instead.
        - The class constructor is defined using an old syntax; use __construct() instead.
        - The property $nombre in the class does not have a visibility modifier (public, protected, or private).
        - The error handling could be improved by using more specific exception types.
        - There is no input data sanitization or validation.
        
        **Fixed Code:**
        <?php
        // Declaración de variables con tipos estrictos
        $nombre = "Juan";
        $edad = 25;
        
        // Función con tipado de parámetros y retorno
        function saludar(string $nombre): string {
            return "Hola, " . htmlspecialchars($nombre) . "!";
        }
        
        // Uso de la sintaxis corta para arrays
        $numeros = [1, 2, 3, 4, 5];
        
        // Iteración con foreach
        foreach ($numeros as $numero) {
            echo "Número: " . $numero . "\n";
        }
        
        // Manejo de errores con try-catch estándar
        try {
            if ($edad < 18) {
                throw new Exception("Debes ser mayor de edad.");
            }
            echo "Edad válida: " . $edad;
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
        
        // Uso de clases con tipado y constructor moderno
        class Persona {
            private string $nombre;
        
            public function __construct(string $nombre) {
                $this->nombre = htmlspecialchars($nombre);
            }
        
            public function saludar(): string {
                return "Hola, soy " . $this->nombre;
            }
        }
        
        $persona = new Persona("Ana");
        echo $persona->saludar();
        ?>
        `
      })
  }

  savePrompt(info: InfoToSavePrompt ) {
    console.log(info);

  }
}
