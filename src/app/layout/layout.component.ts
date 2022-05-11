import { Component, OnInit } from '@angular/core';
import { BusinessSignupService } from './business-home/business-signup/business-signup-form/business-signup.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  currentUser: any = JSON.parse(localStorage.getItem('user') || '0');

  constructor(private businessSignupService: BusinessSignupService) { }

  ngOnInit(): void {
    this.businessSignupService.setCurrentUser(this.currentUser? this.currentUser : null);
  }

}
