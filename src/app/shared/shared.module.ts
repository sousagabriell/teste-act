import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from './client-service/client.service';


@NgModule({
  imports: [CommonModule],
  providers: [Client],
})
export class SharedModule { }
