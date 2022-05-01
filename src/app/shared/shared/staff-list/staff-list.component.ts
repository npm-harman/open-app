import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { staffList } from 'src/constants/staff-list';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  @Input() allowEdit: boolean;
  staffMemberForm: FormGroup;
  staffList = staffList;
  showForm: any = false;
  imageUrl: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initStaffDetailsForm();
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

  onAddStaffMember() {
    this.showForm = true;
  }

  onSubmit() {
    console.log(this.staffMemberForm.value);
  }

  onCancel() {
    this.staffMemberForm.reset();
    this.showForm = false;
  }

  updateImageUrl(e: any) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }
}

