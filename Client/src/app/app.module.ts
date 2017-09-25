import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {RouterModule, Routes} from "@angular/router";
import {MainMenuComponent} from "./main-menu/main-menu.component";

const appRoutes: Routes = [
  {path: "", component: MainMenuComponent, pathMatch: "full"},
  {path: "**", component: MainMenuComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent
  ],
  imports: [
      RouterModule.forRoot(
        appRoutes,
           {enableTracing: true}
      ),
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
