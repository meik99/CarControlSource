import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor() { }

  files = [
    "This house is not for sale",
    "Can't go home",
    "More than you know"
  ];

  ngOnInit() {
  }

}
