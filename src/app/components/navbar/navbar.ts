import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authentication } from '../../services/authentication';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private constructor(public authenticationService: Authentication) {}
}
