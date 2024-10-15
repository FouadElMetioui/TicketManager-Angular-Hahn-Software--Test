import {Component, OnInit} from '@angular/core';
import {PaginationComponent} from "../pagination/pagination.component";
import {Ticket} from "../../models/Ticket";
import {DataService} from "../../services/data/data.service";
import {HandleModalService} from "../../services/modal/handle-modal.service";
import {AddTaskComponent} from "../add-task/add-task.component";
import {EditTaskComponent} from "../edit-task/edit-task.component";
import {TicketService} from "../../services/ticket/ticket.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FormatDatePipe} from "../../pipes/format-date.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        PaginationComponent,
        AddTaskComponent,
        EditTaskComponent,
        NgForOf,
        FormsModule,
        FormatDatePipe
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    tickets:Ticket[] = [];
    selectedTicketId!: number ;
    filterText : string = ""

    constructor(private _dataService : DataService ,
                private _ticketService: TicketService,
                private _handleModalVisibility : HandleModalService) {
    }
    ngOnInit(): void {
        this._dataService.getAllTickets().subscribe(res => {
            this.tickets = res.tickets;
            this._dataService.updateNbrPages(res.totalPages)
        })

        this._ticketService.ticketUpdated$.subscribe(() => {
            this._dataService.getAllTickets().subscribe(res => {
                this.tickets = res.tickets;
                this._dataService.updateNbrPages(res.totalPages)
            })
        })
    }

    deleteTicket(id: number | null) {
        this._dataService.deleteTicketById(id).subscribe(() => {
            this.tickets = this.tickets.filter(t => t.id !== id)
        })
    }

    showModal() {
        this._handleModalVisibility.showModal()
    }

    updateTicket(id: number) {
        this.selectedTicketId = id;
        this._handleModalVisibility.showEditModal()
    }

    filteredTickets(): Ticket[] {
        return this.tickets.filter(ticket =>
            ticket.description.toLowerCase().includes(this.filterText.toLowerCase()) ||
            ticket.status.toLowerCase().includes(this.filterText.toLowerCase()));
    }


}
