import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "./Song";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor(private http: HttpClient) { }

  currentSong: String = "This house is not for sale";
  songs: Song[] = [];
  playing: boolean = true;

  maxNameLength = 24;

  ngOnInit() {
    this.http.get<String[]>("http://localhost:8080/").subscribe(
        data => {
            let result: Song[] = [];
            data = data.length > 4 ? data.splice(0, 4) : data;

            for(let i = 0; i < data.length; i++){
                result[i] = new Song();
                result[i].fullname = data[i];
                data[i] = data[i].length > this.maxNameLength ? data[i].substr(0, this.maxNameLength) + "..." : data[1];
                result[i].displayname = data[i];
            }

            this.songs = result;
        }
    );
  }

  changeState(){
    this.playing = !this.playing;
  }

  playSong(song: Song){
      this.http.post("http://localhost:8080/play", {song: song.fullname})
          .subscribe(data => {
                this.playing = true;
                this.currentSong = song.fullname.substr(0, this.maxNameLength * 2);
      });

  }
}
