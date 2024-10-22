import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
export interface ResponseBito{
  response: string
}
@Injectable({
  providedIn: 'root'
})
export class BitoService {
  private readonly baseUrl = environment.baseURL;
  http = inject(HttpClient);
  
  useBitoCLI(prompt: string): Observable<ResponseBito>{
    const data = { prompt };
    return this.http.post<ResponseBito>(`${this.baseUrl}/bito/base`,data);
  }

  useBitoClIWithFile(prompt: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('prompt', JSON.stringify(prompt));
    formData.append('file', file,file.name);

    //TODO AJUSTAR INTERFACCE PARA RESPUESTA QUITAR ANY
    //TODO AJUSTAR RECIBIR RESPUESTA COMO ERROR
    // return this.http.post<ResponseBito>(`${this.baseUrl}/bito/file`,data);
    return this.http.post<any>(`${this.baseUrl}/bito/file`,formData);
  }
}
