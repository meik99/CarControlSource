import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent} from "./navbar/navbar.component";
import { MusicComponent } from './music/music.component';
import {HttpClientModule} from "@angular/common/http";
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MusicComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
