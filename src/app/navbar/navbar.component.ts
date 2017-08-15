import { Component, OnInit } from '@angular/core';
import {Feature} from "./feature";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  feature = Feature;

  private _selectedFeature: Feature = Feature.Music;

  get selectedFeature(): Feature {
    return this._selectedFeature;
  }

  ngOnInit() {
  }


  selectFeature(feature: Feature) {
    this._selectedFeature = feature;
  }
}

