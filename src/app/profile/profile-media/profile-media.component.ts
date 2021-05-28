import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-media',
  templateUrl: './profile-media.component.html',
  styleUrls: ['./profile-media.component.css']
})
export class ProfileMediaComponent implements OnInit, OnDestroy {
  @Output() closeSidenV = new EventEmitter<void>();

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  closeSidenav: any;
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
