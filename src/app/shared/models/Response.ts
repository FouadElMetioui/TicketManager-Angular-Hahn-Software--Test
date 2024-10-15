import {Ticket} from "./Ticket";

export interface Response {
    tickets: Ticket[];
    totalItems: number;
    totalPages: number;
}
