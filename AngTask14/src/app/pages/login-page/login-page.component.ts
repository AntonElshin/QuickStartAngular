import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  loadingExecutingFlag = false;
  disableFlag = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loadingExecutingFlag = true;
    this.disableFlag = true;

    this.auth.login(this.form.controls.login.value, this.form.controls.password.value);

    this.auth.isAuthenticated().then(isAuth => {

      if (isAuth) {
        this.router.navigate(['/reference']).then(() => {
            this.form.controls.login.setValue(null);
            this.form.controls.password.setValue(null);
            this.loadingExecutingFlag = false;
            this.disableFlag = false;
          }
        );
      }
      else {
        this.form.controls.login.setValue(null);
        this.form.controls.password.setValue(null);
        this.loadingExecutingFlag = false;
        this.disableFlag = false;
        this.reloadCurrentRoute();
      }


    });

  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
