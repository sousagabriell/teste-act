import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../components/home/table/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Table],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
