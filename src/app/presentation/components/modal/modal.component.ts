import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'rvia-modal',
  standalone: true,
  imports: [NgClass,NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = '';
  @Output() clickClose = new EventEmitter<boolean>();

  public isOpen  = signal(true);
  public isAnimating = signal(true);

  closeModal(): void {
    this.isAnimating.set(false);
    setTimeout(() => {
      this.isOpen.set(false);
      this.clickClose.emit()
    },300);
  }
}
