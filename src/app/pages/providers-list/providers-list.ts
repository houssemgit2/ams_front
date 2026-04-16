import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProviderService } from '../../services/providerService';
import { CommonModule } from '@angular/common';
import { Provider } from '../../../models';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-providers-list',
  imports: [CommonModule],
  templateUrl: './providers-list.html',
  styleUrls: ['./providers-list.scss'],
})
export class ProvidersList implements OnInit {
  listProviders = new BehaviorSubject<Provider[]>([]);

  constructor(
    private providerService: ProviderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders() {
    this.providerService.getProviders().subscribe({
      next: (data: Provider[]) => {
        this.listProviders.next(data);
      },
      error: (err) => {
        console.log('Erreur de récupération des providers', err);
      },
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this provider?')) {
      this.providerService.deleteProvider(id).subscribe({
        next: () => {
          this.loadProviders();
        },
        error: (err) => console.log(err),
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/home/providers/edit', id]);
  }
}
