import {Component, ViewChild} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {Feature} from "./navbar/feature";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}
