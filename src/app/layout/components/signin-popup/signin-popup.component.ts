import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessSignupService } from '../../business-home/business-signup/business-signup-form/business-signup.service';

@Component({
  selector: 'app-signin-popup',
  templateUrl: './signin-popup.component.html',
  styleUrls: ['./signin-popup.component.scss'],
})
export class SigninPopupComponent implements OnInit {
  closeResult = '';
  signinForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
  openTab: any = null;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private businessSignupService: BusinessSignupService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.openTab = params['openTab'] ? params['openTab'] : 'personal';
    });
  }

  initSigninForm() {
    this.signinForm = this.fb.group({
      emailId: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.signinForm.value);
    this.businessSignupService.signin(this.signinForm.value)
    .subscribe(res=>{
      this.businessSignupService.setCurrentUser(res);
      localStorage.setItem('user', JSON.stringify(res));
      if(res.bId && res.bId > 0){
        this.router.navigate(['/general/business-home/calendar']);
      }
    this.modalService.dismissAll();
    });
  }

  open(content: any) {
    this.initSigninForm();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
