import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HandleModalService {
    private isModalVisible = new BehaviorSubject<boolean>(false);
    isModalVisible$ = this.isModalVisible.asObservable();

    private isEditModalVisible = new BehaviorSubject<boolean>(false);
    isEditModalVisible$ = this.isEditModalVisible.asObservable();

    constructor() {
    }

    toggleModalVisibility(isVisible: boolean) {
        this.isModalVisible.next(isVisible);
    }

    showModal() {
        this.toggleModalVisibility(true);
    }

    showEditModal() {
        this.isEditModalVisible.next(true);
    }


}
