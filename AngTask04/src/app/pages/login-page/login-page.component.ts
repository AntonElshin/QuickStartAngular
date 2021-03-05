import {Component, OnInit, ViewChild} from '@angular/core';
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
      this.form.controls.login.setValue(null);
      this.form.controls.password.setValue(null);

      this.router.navigate(['']);
    }, 3000);
  }
}
