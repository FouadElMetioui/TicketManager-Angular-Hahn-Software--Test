import {Component, computed, OnInit, signal, Signal} from '@angular/core';
import {DataService} from "../../services/data/data.service";
import {TicketService} from "../../services/ticket/ticket.service";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [
        NgClass,

    ],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
    currentPage: number = 1;
    nbrPages = signal<number>(1);
    pages = computed(() => {
        return Array(this.nbrPages()).fill(0).map((_, i) => i + 1);
    })

    constructor(private _dataService: DataService, private _ticketService: TicketService) {

    }

    ngOnInit(): void {
        this._dataService.nbrPages$.subscribe((nbr) => {
            this.nbrPages.set(nbr);
        })

        this._dataService.currentPage$.subscribe((page) => {
            this.currentPage = page;
        })
    }

    nextPage() {
        if (this.currentPage < this.nbrPages()) {
            this._dataService.toNextPage();
            this._ticketService.notifyTicketUpdated()
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this._dataService.toPreviousPage();
            this._ticketService.notifyTicketUpdated()
        }

    }

    goToPage(page: number) {
        this._dataService.changePage(page);
        this._ticketService.notifyTicketUpdated()
    }

}
