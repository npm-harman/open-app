import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessSignupService } from '../../business-home/business-signup/business-signup-form/business-signup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessSignupService: BusinessSignupService
  ) {}

  openTab = 'personal';
  subscription: any;
  currentUser: any = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.openTab = params['openTab'] ? params['openTab'] : 'personal';
      console.log(this.openTab);
    });
    this.subscription = this.businessSignupService
      .getCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
      });
  }

  goToProfile(){
    if(this.currentUser.bId && this.currentUser.bId>0){
    this.router.navigate(['/general/business-home/profile'], { queryParams: { bId: this.currentUser.bId } });
    }else{
    this.router.navigate(['/general/user'], { queryParams: { uId: this.currentUser.id } });
    }
  }

  logout(){
    this.businessSignupService.setCurrentUser(null);
    this.router.navigate(['/general/home']);
    localStorage.clear();
  }
}
