import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "./Song";

const MAX_NAME_LENGTH: number = 36;
const SONGS_PER_PAGE: number = 4;
const VOLUME_STEP: number = 5;

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    currentSong: Song = null;
    songs: Song[] = [];
    playing: boolean = true;
    currentPage: number = 0;
    pages: number = 0;
    songsPerPage: number = SONGS_PER_PAGE;
    volume: number;
    time: number;

    math = Math;

    ngOnInit() {
        this.http.get<String[]>("http://localhost:8080/titles").subscribe(
            data => {
                let result: Song[] = [];

                for (let i = 0; i < data.length; i++) {
                    result[i] = new Song();
                    result[i].fullname = data[i];
                    data[i] = data[i].length > MAX_NAME_LENGTH ? data[i].substr(0, MAX_NAME_LENGTH) + "..." : data[i];
                    result[i].displayname = data[i];
                }

                this.songs = result;
                this.pages = result.length / SONGS_PER_PAGE;
            }
        );

        setInterval(() => {
            this.http.get("http://localhost:8080/music/status").subscribe(data => {
               this.updateStatus(data);
            });
        }, 100);
    }

    changeState() {
        this.playing = !this.playing;
        if(this.playing == false){
            this.http.get("http://localhost:8080/pause").subscribe();
        }else{
            this.http.get("http://localhost:8080/resume").subscribe();
        }
    }

    playSong(song: Song) {
        this.http.post("http://localhost:8080/play", {song: song.fullname})
            .subscribe(data => {
                this.playing = true;
                this.currentSong = song;
                this.updateStatus(data);
            });

    }

    updateStatus(data){
        if(this.playing == true && data["playing"] == false && data["position"] > 10){
            this.next();
        }
        this.playing = data["playing"];
        this.volume = data["volume"];
        this.time = data["position"];

        if(this.currentSong == null){
            if(data["filename"]){
                this.songs.forEach(function (item) {
                    if(data["filename"].indexOf(item.fullname) > -1){
                        this.currentSong = item;
                    }
                }, this);
            }
        }
        console.log(data);
    }

    volumeUp(){
        if(this.volume < 100){
            this.volume += VOLUME_STEP;
            this.http.post("http://localhost:8080/volume", {volume: this.volume}).subscribe();
        }
    }

    volumeDown(){
        if(this.volume > 0){
            this.volume -= VOLUME_STEP;
            this.http.post("http://localhost:8080/volume", {volume: this.volume}).subscribe();
        }
    }

    next(){
        var nextIndex: number = this.songs.indexOf(this.currentSong) + 1;

        if(nextIndex >= this.songs.length){
            nextIndex = 0;
        }

        this.playSong(this.songs[nextIndex]);
    }

    previous(){
        var nextIndex: number = this.songs.indexOf(this.currentSong) - 1;

        if(nextIndex < 0){
            nextIndex = this.songs.length -1;
        }

        this.playSong(this.songs[nextIndex]);
    }
}
