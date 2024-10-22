import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Message } from '@interfaces/index';
import { ChatMessageComponent, GptMessageOrthographyComponent, 
  MyMessageComponent, TextMessageBoxComponent,TypingLoaderComponent } from '@components/index';
import { BitoService } from 'app/presentation/services/bito.service';


@Component({
  selector: 'app-bito-page',
  standalone: true,
  imports: [ChatMessageComponent, GptMessageOrthographyComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent],
  templateUrl: './bito-page.component.html',
  styleUrl: './bito-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BitoPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  // public openAiService = inject(  );
  private bitoService = inject( BitoService );
  
  handleMessage( prompt: string ) {

    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.bitoService.useBitoCLI( prompt )
      .subscribe( resp => {
        this.isLoading.set(false);

      console.log(resp);
        this.messages.update( (prev:any) => [
          ...prev,
          {
            isGpt: true,
            text: resp.response,
            info: resp,
          }
        ])

      })
  }

}
