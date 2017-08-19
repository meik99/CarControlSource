import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent} from "./navbar/navbar.component";
import { MusicComponent } from './music/music.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MusicComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
