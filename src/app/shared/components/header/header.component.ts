import {Component, OnDestroy, OnInit} from '@angular/core';
import {DarkModeService} from "../../services/dark-mode/dark-mode.service";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";



@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        FormsModule


    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
    darkMode :boolean = false;
    darkModeSubscription!: Subscription;

    constructor(private _darkModeService : DarkModeService) {

    }

    ngOnInit() {
        this.darkModeSubscription = this._darkModeService.darkMode$.subscribe(value => {
            this.darkMode = value;
        });
    }

    ngOnDestroy() {
        if (this.darkModeSubscription) {
            this.darkModeSubscription.unsubscribe();
        }
    }


    toggleTheme = () => {
        this._darkModeService.toggleDarkMode()
    }


}
