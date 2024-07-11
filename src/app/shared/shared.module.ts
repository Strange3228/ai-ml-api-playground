import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule
  ]
})
export class SharedModule {}
