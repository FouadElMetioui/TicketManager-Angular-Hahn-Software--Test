import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    private darkModeSubject = new BehaviorSubject<boolean>(false);
    darkMode$ = this.darkModeSubject.asObservable();

    constructor() { }


    setDarkMode(isDarkMode: boolean) {
        this.darkModeSubject.next(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggleDarkMode() {
        const currentMode = this.darkModeSubject.value;
        this.setDarkMode(!currentMode);
    }


}
