import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-signup-popup',
  templateUrl: './user-signup-popup.component.html',
  styleUrls: ['./user-signup-popup.component.scss']
})
export class UserSignupPopupComponent implements OnInit {
  closeResult = '';
  signinForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;



  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  initSigninForm(){
    this.signinForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      fullName: [null, Validators.required],
    });
  }
  
  onSubmit(){
    console.log(this.signinForm.value);
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

}
