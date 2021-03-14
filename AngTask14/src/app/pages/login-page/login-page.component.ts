import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  loadingExecutingFlag = false;
  disableFlag = false;

  constructor(private router: Router) {
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

    setTimeout(() => {
      console.log('Timeout is over');
      this.loadingExecutingFlag = false;
      this.disableFlag = false;

      if (this.form.controls.login.value === 'dsso' && this.form.controls.password.value === '12345678') {
        this.form.controls.login.setValue(null);
        this.form.controls.password.setValue(null);
        this.router.navigate(['/reference']);
      }
      else {
        this.form.controls.login.setValue(null);
        this.form.controls.password.setValue(null);
        this.reloadCurrentRoute();
      }

    }, 2000);
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
