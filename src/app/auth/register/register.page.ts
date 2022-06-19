import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  //Next, add the register() method that will be called for registering users:
  /**
    This method simply calls the register() method of AuthService, subscribe to the returned Observable and navigate to the home page when registration is done.

    We use the navigateByUrl() method of the Angular Router to navigate to a page by its URL.

    The register() method takes an Angular form object. The value variable contains a JS object that corresponds to the fields of the form and their values.
   */
  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }
}
