import {Component, OnInit, Input} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {HandleModalService} from "../../services/modal/handle-modal.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataService} from "../../services/data/data.service";
import {Ticket} from "../../models/Ticket";
import {TicketService} from "../../services/ticket/ticket.service";

@Component({
    selector: 'app-edit-task',
    standalone: true,
    imports: [
        NzModalComponent,
        NzButtonComponent,
        NzModalContentDirective,
        NzModalModule,
        ReactiveFormsModule,
    ],
    templateUrl: './edit-task.component.html',
    styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
    @Input() ticketId!: number;

    isEditModalVisible: boolean = false;
    ticketForm!: FormGroup;
    ticketToEdit!: Ticket;

    constructor(private _handleModalService: HandleModalService,
                private _ticketService: TicketService ,
                private _dataService: DataService) {
        this.ticketForm = new FormGroup({
            description: new FormControl('', Validators.required),
            status: new FormControl('', Validators.required),
            createOn: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        this._dataService.getTicketById(this.ticketId).subscribe(ticket => {
            this.ticketToEdit = ticket;
            this.ticketForm.patchValue(ticket);
        });

        this._handleModalService.isEditModalVisible$.subscribe(isv => this.isEditModalVisible = isv);

    }


    handleCancel() {
        this.isEditModalVisible = false;
    }


    onSubmit() {
        if (this.ticketForm.valid) {
            this._dataService.updateTicket(this.ticketForm.value, this.ticketId).subscribe(() => {
                this._ticketService.notifyTicketUpdated()
                this.isEditModalVisible = false;
                this.ticketForm.reset();
            });
        }
    }
}
