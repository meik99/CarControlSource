import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "./Song";
import {TimeInterval} from "rxjs/Rx";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

const MAX_NAME_LENGTH = 36;
const SONGS_PER_PAGE = 4;
const VOLUME_STEP = 5;

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
    playing = false;
    currentPage = 0;
    pages = 0;
    songsPerPage: number = SONGS_PER_PAGE;
    volume = 0;
    time = 0;
    nextSong = false;

    math = Math;

    @Output()
    onBack = new EventEmitter();

    ngOnInit() {
        this.http.get<String[]>("http://localhost:8080/titles").subscribe(
            data => {
                const result: Song[] = [];

                for (let i = 0; i < data.length; i++) {
                    result[i] = new Song();
                    result[i].fullname = data[i];
                    data[i] = data[i].length > MAX_NAME_LENGTH ? data[i].substr(0, MAX_NAME_LENGTH) + "..." : data[i];
                    result[i].displayname = data[i];
                }

                this.songs = result;
                this.pages = result.length / SONGS_PER_PAGE;

                IntervalObservable.create(10)
                    .subscribe(() => {
                        this.http.get("http://localhost:8080/music/status").subscribe(data => {
                            this.updateStatus(data);
                        });
                    });
            },
            error => {
                console.log(error);
            }
        );
    }



    changeState() {
        this.playing = !this.playing;
        if (this.playing === false) {
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
            });
    }

    updateStatus(data){
        // this.playing = data["playing"];
        if (this.nextSong === false && data["next"] && data["next"] === true){
            this.nextSong = true;
            this.next();
        }
        if (data["next"] && data["next"] === false) {
            this.nextSong = false;
        }
        this.volume = data["volume"];
        this.time = data["position"];

        if (this.currentSong == null){
            if (data["filename"]){
                this.songs.forEach(function (item) {
                    if (data["filename"].indexOf(item.fullname) > -1){
                        this.currentSong = item;
                        this.playing = true;
                    }
                }, this);
            }
        }
    }

    volumeUp(){
        if (this.volume < 100){
            this.volume += VOLUME_STEP;
            this.http.post("http://localhost:8080/volume", {volume: this.volume}).subscribe();
        }
    }

    volumeDown(){
        if (this.volume > 5){
            this.volume -= VOLUME_STEP;
            this.http.post("http://localhost:8080/volume", {volume: this.volume}).subscribe();
        }
    }

    next(){
        let nextIndex: number = this.songs.indexOf(this.currentSong) + 1;

        if (nextIndex >= this.songs.length){
            nextIndex = 0;
        }

        this.playSong(this.songs[nextIndex]);
    }

    previous(){
        let nextIndex: number = this.songs.indexOf(this.currentSong) - 1;

        if (nextIndex < 0){
            nextIndex = this.songs.length - 1;
        }

        this.playSong(this.songs[nextIndex]);
    }
}
