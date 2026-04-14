import { Component } from '@angular/core';
import { Provider } from '../../../models';
import { ProvidersList } from '../providers-list/providers-list';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ProvidersList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  providers: Provider[] = [
    { id: 1, name: 'Samsung', email: 'contact@samsung.com', address: 'Corée du Sud' },
    { id: 2, name: 'Toshiba', email: 'contact@toshiba.com', address: 'Japon' },
    { id: 3, name: 'Apple', email: 'contact@apple.com', address: 'USA' },
    { id: 4, name: 'Sony', email: 'contact@sony.com', address: 'Japon' },
    { id: 5, name: 'LG', email: 'contact@lg.com', address: 'Corée du Sud' },
  ];
}
