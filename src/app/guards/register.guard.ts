import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {SettingsService} from "../services/settings.service";

@Injectable()

export class RegisterGuard implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService) {
  }

  //If the registration isn't allowed, redirect the user to the login page
  canActivate(): boolean {

    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
