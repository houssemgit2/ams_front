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
  selectedFile!: File;
  constructor(
    private providerService: ProviderService,
    private router: Router,
  ) {}

  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
  }
  onSubmit(providerForm: NgForm) {
    const provider = new FormData();
    provider.append('imageFile', this.selectedFile, this.selectedFile.name);
    //provider.append('imageName',this.selectedFile.name);
    provider.append('name', providerForm.value.name);
    provider.append('email', providerForm.value.email);
    provider.append('address', providerForm.value.address);

    this.providerService.saveProvider(provider).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['home/providers']);
      },
      (error) => {
        console.error(error);
        // Handle error, e.g., show an error message
        console.error('Erreur ajout provider', error);
      },
    );
  }
}
