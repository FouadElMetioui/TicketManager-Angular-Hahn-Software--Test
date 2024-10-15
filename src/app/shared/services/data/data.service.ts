import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Ticket} from "../../models/Ticket";
import {Response} from "../../models/Response";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    apiBaseUrl = environment.apiBaseUrl;

    private currentPage = new BehaviorSubject<number>(1);
    currentPage$ = this.currentPage.asObservable();

    private pageSize = new BehaviorSubject<number>(8);
    pageSize$ = this.pageSize.asObservable();

    private nbrPages = new BehaviorSubject<number>(0);
    nbrPages$ = this.nbrPages.asObservable();

    constructor(private http: HttpClient) {
    }

    getAllTickets() : Observable<Response> {
        return this.http.get<Response>(`${this.apiBaseUrl}?page=${this.currentPage.getValue()}&pageSize=${this.pageSize.getValue()}`);
    }

    getTicketById(id:number) : Observable<Ticket> {
        return this.http.get<Ticket>(`${this.apiBaseUrl}/${id}`)
    }

    deleteTicketById(id: number | null) {
        return this.http.delete(`${this.apiBaseUrl}/${id}`)
    }

    createTicket(ticket: Ticket) : Observable<Ticket> {
        return this.http.post<Ticket>(`${this.apiBaseUrl}`,ticket)
    }

    updateTicket(ticket: Ticket , id:number) : Observable<Ticket> {
        return this.http.put<Ticket>(`${this.apiBaseUrl}/${id}`,ticket)
    }

    changePage(page: number) {
        this.currentPage.next(page);
    }

    resetPage() {
        this.currentPage.next(1);
    }

    toNextPage() {
        this.currentPage.next(this.currentPage.getValue() + 1);
    }

    toPreviousPage() {
        this.currentPage.next(this.currentPage.getValue() - 1);
    }

    changePageSize(size: number) {
        this.pageSize.next(size);
    }

    updateNbrPages(nbrPages: number) {
        this.nbrPages.next(nbrPages);
    }
}
