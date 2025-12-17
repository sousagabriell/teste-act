import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAdd } from '../../../../shared/ui/form-add/form-add';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormAdd],
  templateUrl: './add.html',
  styleUrls: ['./add.scss'],
})
export class Add {}
