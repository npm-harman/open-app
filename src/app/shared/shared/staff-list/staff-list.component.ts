import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PictureService } from '../services/picture.service';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  @Input() allowEdit: boolean;
  @Input() bId: Number;

  staffMemberForm: FormGroup;
  staffList = [];
  showForm: any = false;
  imageUrl: any = null;
  selectedPicture: any = null;
  isLoading: boolean = false;
  subscription: any;

  constructor(private fb: FormBuilder,  private pictureService: PictureService,private staffService: StaffService) {}

  ngOnInit(): void {
    this.initStaffDetailsForm();
    this.subscription = this.staffService.listChange.subscribe(res=>this.getAllStaff());
  }

  initStaffDetailsForm() {
    this.staffMemberForm = this.fb.group({
      firstName: [null, Validators.required],
      profilePicture: null,
      desc: null,
      igProfile: null,
      fbProfile: null,
      tiktokProfile: null,
      bId: this.bId
    });
  }

  onAddStaffMember() {
    this.staffMemberForm.reset();
    this.showForm = true;
  }

  onSubmit() {
    if (this.selectedPicture) {
      const formData = new FormData();
      formData.append('file', this.selectedPicture);
      this.pictureService.upload(formData).subscribe((res) => {
        this.add(res.filename);
      });
    } else {
      this.add(null);
    }
  }

  add(fileName: any) {
    let formValue = this.staffMemberForm.value;
    formValue.profilePicture = fileName;
    formValue.bId = this.bId;
    this.staffService.add(formValue).subscribe((res) => {
      this.showForm = false;
      this.getAllStaff();
    });
  }

  onChangleFile(event: any) {
    this.selectedPicture = event.target.files[0];
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

  getAllStaff(){
    this.isLoading = true;
    this.staffService.getAll(this.bId)
    .subscribe(res =>{
      this.staffList = res;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
}

