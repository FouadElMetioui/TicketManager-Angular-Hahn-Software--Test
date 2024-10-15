import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    constructor() {
    }

    private ticketUpdatedSource = new BehaviorSubject<boolean>(false);
    ticketUpdated$ = this.ticketUpdatedSource.asObservable();


    notifyTicketUpdated() {
        this.ticketUpdatedSource.next(true);
    }


}
