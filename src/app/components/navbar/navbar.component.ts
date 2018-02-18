import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      //if auth is true it means the user is logged in
      if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
      }else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You\'re now logged out', {
      cssClass: 'alert-success', timeout: 5000
    });
    this.router.navigate(['/login']);
  }
}
