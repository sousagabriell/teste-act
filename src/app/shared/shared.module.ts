import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './ui/navbar/navbar';
import { Client } from './client-service/client.service';
import { Footer } from './ui/footer/footer';



@NgModule({
  providers: [
    Client
  ],
  imports: [
    CommonModule,
    Navbar,
    Footer
  ]
})
export class SharedModule { }
