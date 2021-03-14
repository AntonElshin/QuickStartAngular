import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  isAuth = false;

  constructor(private authService: AuthService) {
    this.isAuth = authService.isAuthenticated();
  }

  ngOnInit(): void {
  }

}
