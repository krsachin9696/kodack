import { Component, OnInit } from "@angular/core";
import { AuthStateService, AuthUser } from "../auth/auth-state.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    user: AuthUser | null = null;

    constructor(private authState: AuthStateService) {}

    ngOnInit(): void {
        this.authState.authState$.subscribe(state => {
            this.user = state.user;
        })
    }
}