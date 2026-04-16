import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Provider } from '../../../models';

@Component({
  standalone: true,
  selector: 'app-provider-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-modal.html',
  styleUrls: ['./provider-modal.scss'],
})
export class ProviderModal implements OnChanges {
  @Input() provider: Provider | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<Provider>();

  formProvider: Provider | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('chengers==>', this.provider);

    if (changes['provider'] && this.provider) {
      this.formProvider = { ...this.provider }; // clone
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.formProvider) {
      this.update.emit(this.formProvider);
    }
  }

  onClose() {
    this.close.emit();
  }
}
