import { Component, OnInit } from '@angular/core';
import { BusinessSignupService } from './business-signup-form/business-signup.service';

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.scss']
})
export class BusinessSignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
