import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-list-item',
  templateUrl: './staff-list-item.component.html',
  styleUrls: ['./staff-list-item.component.scss']
})
export class StaffListItemComponent implements OnInit {

  @Input() staffDetails: any;
  @Input() allowEdit: any;
  staffMemberForm: FormGroup;
  showForm: any = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initStaffDetailsForm();
    console.log(this.staffDetails);
  }

  initStaffDetailsForm() {
    this.staffMemberForm = this.fb.group({
      fullName: [null, Validators.required],
      picture: null,
      desc: null,
      igProfile: null,
      fbProfile: null,
      tiktokProfile: null,
    });
  }

  onSubmit(){
    console.log(this.staffMemberForm.value)
  }

  onEditClicked(){
    this.showForm= true;
    this.staffMemberForm.patchValue(this.staffDetails);
  }

  onCancel(){
    this.staffMemberForm.reset();
    this.showForm = false;
  }

}
