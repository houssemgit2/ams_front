import { Component, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProviderService } from '../../services/providerService';
import { CommonModule } from '@angular/common';
import { Provider } from '../../../models';
import { ProviderModal } from '../../components/provider-modal/provider-modal';
import { environment } from '../../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-providers-list',
  imports: [CommonModule, ProviderModal],
  templateUrl: './providers-list.html',
  styleUrls: ['./providers-list.scss'],
})
export class ProvidersList implements OnInit {
  listProviders = new BehaviorSubject<Provider[]>([]);
  selectedProvider = signal<Provider | null>(null);
  urlUpload = environment.urlUploadImage;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders() {
    this.providerService.getProviders().subscribe({
      next: (data: Provider[]) => {
        console.log('==>', data);

        this.listProviders.next(data);
      },
      error: (err) => console.error(err),
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this provider?')) {
      this.providerService.deleteProvider(id).subscribe({
        next: () => {
          const updated = this.listProviders.value.filter((p) => p.id !== id);
          this.listProviders.next(updated);
        },
        error: (err) => console.error(err),
      });
    }
  }

  openModal(provider: Provider) {
    this.selectedProvider.set({ ...provider });
  }

  closeModal() {
    this.selectedProvider.set(null);
  }

  handleUpdate(updated: Provider) {
    this.providerService.updateProvider(updated).subscribe({
      next: (res) => {
        const list = this.listProviders.value.map((p) => (p.id === res.id ? res : p));
        this.listProviders.next(list);
        this.closeModal();
      },
      error: (err) => console.error(err),
    });
  }
}
