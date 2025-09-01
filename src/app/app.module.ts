import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';   
import { MarkdownModule } from 'ngx-markdown';         


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    MarkdownModule.forRoot()  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
