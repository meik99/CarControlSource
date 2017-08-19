import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor() { }

  currentSong: String = "This house is not for sale";
  playing: boolean = true;

  ngOnInit() {
  }

  changeState(){
    this.playing = !this.playing;
  }
}
