import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  @Output() sidenavToggle = new EventEmitter<void>();

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

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

}
