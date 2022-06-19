import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

/**
 * add the login() method:
 */
//The login() method simply calls the login() method of AuthService and subscribe to the returned Observable then navigate to the home page when login is done.
  login(form){
    console.log(`login Data ===============\n\n ${JSON.stringify(form.value,null,4)} \n`);
    var userRequest={
      pin:form.value.pin,
      deviceId:"2323232323232323232323",
      phonenumber: form.value.phonenumber
    }
    this.authService.login(userRequest).subscribe((res)=>{
      console.log(`login Data ===============\n\n ${JSON.stringify(res,null,4)} \n`);
      this.router.navigateByUrl('home');
    });
  }
}
