import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProviderService } from '../../services/providerService';
import { CommonModule } from '@angular/common';
import { Provider } from '../../../models';

@Component({
  standalone: true,
  selector: 'app-providers-list',
  imports: [CommonModule],
  templateUrl: './providers-list.html',
  styleUrl: './providers-list.scss',
})
export class ProvidersList implements OnInit {
  listProviders = new BehaviorSubject<Provider[] | null>(null);

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getProviders().subscribe({
      next: (data: any) => {
        this.listProviders.next(data);
        console.log(this.listProviders);
      },
      error: (err) => {
        console.log('Erreur de récupération des providers', err);
      },
    });
  }
}
