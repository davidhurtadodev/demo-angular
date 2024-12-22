import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: ` <button [type]="type" [class]="customCss" (click)="handleClick()">
    {{ label }}
  </button>`,
  styles: ``,
})
export class ButtonComponent {
  @Input() customCss: string = '';
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
