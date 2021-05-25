import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authServise: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authServise.getIsAuth();
    this.authListenerSubs = this.authServise
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authServise.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onClose() {
    this.closeSidenav.emit();
  }
}
