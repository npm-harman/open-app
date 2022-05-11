import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/shared/services/user.service';
import { AppToastService } from 'src/app/utils/app-toast.service';

@Component({
  selector: 'app-user-signup-popup',
  templateUrl: './user-signup-popup.component.html',
  styleUrls: ['./user-signup-popup.component.scss']
})
export class UserSignupPopupComponent implements OnInit {
  closeResult = '';
  signinForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;



  constructor(private modalService: NgbModal, private fb: FormBuilder, private userService: UserService, 
    private appToastService: AppToastService,) { }

  ngOnInit(): void {
  }

  initSigninForm(){
    this.signinForm = this.fb.group({
      emailId: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      firstName: [null, Validators.required],
    });
  }
  
  onSubmit(){
   this.userService.registerUser(this.signinForm.value)
   .subscribe(res=>{
     this.showSuccess();
    this.modalService.dismissAll();
   })
  }

  open(content: any) {
    this.initSigninForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  showSuccess() {
    this.appToastService.show({
      message: 'Sign up successful!',
      class: 'bg-success text-light',
      delay: 10000,
    });
  }

}
