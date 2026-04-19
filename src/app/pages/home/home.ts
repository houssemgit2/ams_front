import { Component } from '@angular/core';
import { Provider } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
