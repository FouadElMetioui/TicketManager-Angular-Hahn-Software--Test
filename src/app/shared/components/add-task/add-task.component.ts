import {Component, OnInit} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {HandleModalService} from "../../services/modal/handle-modal.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataService} from "../../services/data/data.service";
import {TicketService} from "../../services/ticket/ticket.service";


@Component({
    selector: 'app-add-task',
    standalone: true,
    imports: [
        NzModalComponent,
        NzButtonComponent,
        NzModalContentDirective,
        NzModalModule,
        ReactiveFormsModule,
    ],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
    isVisible: boolean = false;
    ticketForm!: FormGroup;

    constructor(private _handleModalService: HandleModalService ,
                private _ticketService: TicketService,
                private _dataService: DataService) {
        this.ticketForm = new FormGroup({
            description: new FormControl('', Validators.required),
            status: new FormControl('Choose Ticket Status'),
            createOn: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required])
        });
    }

    ngOnInit(): void {
        this._handleModalService.isModalVisible$.subscribe(isv => this.isVisible = isv);
        console.log(this.isVisible)
    }


    handleCancel() {
        this.isVisible = false;
    }


    onSubmit() {
        if(this.ticketForm.valid) {
            this._dataService.createTicket(this.ticketForm.value).subscribe(() => {
                this._ticketService.notifyTicketUpdated()
                this.isVisible = false;
                this.resetForm();
            });
        }
    }

    resetForm () {
        this.ticketForm = new FormGroup({
            description: new FormControl('', Validators.required),
            status: new FormControl('Choose Ticket Status'),
            createOn: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required])
        });
    }

}
