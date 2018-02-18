import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    //Redirect to dashboard if the user is logged in
    this.authService.getAuth().subscribe(auth => {
      //if auth is true it means the user is logged in
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password).then(res => {
      this.flashMessage.show('Welcome back!', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/']);
    }).catch(
      err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 5000
        });
      }
    ); //reject err on Service is caught with catch()
  }
}
