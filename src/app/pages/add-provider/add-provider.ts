import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProviderService } from '../../services/providerService';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-add-provider',
  imports: [FormsModule],
  templateUrl: './add-provider.html',
  styleUrl: './add-provider.scss',
})
export class AddProvider {
  constructor(
    private providerService: ProviderService,
    private router: Router,
  ) {}

  onSubmit(providerForm: NgForm) {
    if (providerForm.valid) {
      this.providerService.saveProvider(providerForm.value).subscribe(
        (data) => {
          this.router.navigate(['/home/providers']);
        },
        (error) => console.log(error),
      );
      providerForm.reset();
    }
  }
}
