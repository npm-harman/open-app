import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environment';
import { PictureService } from '../services/picture.service';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-staff-list-item',
  templateUrl: './staff-list-item.component.html',
  styleUrls: ['./staff-list-item.component.scss']
})
export class StaffListItemComponent implements OnInit {

  @Input() staffDetails: any;
  @Input() allowEdit: any;
  @Input() bId: Number;

  selectedPicture: any = null;
  isLoading: boolean = false;

  staffMemberForm: FormGroup;
  showForm: any = false;
  imageEndpoint = environment.assetsEndPoint;

  constructor(private fb: FormBuilder, private pictureService: PictureService, private staffService: StaffService) { }

  ngOnInit(): void {
    this.initStaffDetailsForm();
    console.log(this.staffDetails);
  }

  initStaffDetailsForm() {
    this.staffMemberForm = this.fb.group({
      firstName: [null, Validators.required],
      profilePicture: null,
      desc: null,
      igProfile: null,
      fbProfile: null,
      tiktokProfile: null,
      bId: null,
      id: null
    });
  }

  onSubmit() {
    if (this.selectedPicture) {
      const formData = new FormData();
      formData.append('file', this.selectedPicture);
      this.pictureService.upload(formData).subscribe((res) => {
        this.update(res.filename);
      });
    } else {
      this.update(null);
    }
  }

  update(fileName: any) {
    let formValue = this.staffMemberForm.value;
    formValue.profilePicture = fileName ? fileName : formValue.profilePicture;
    console.log(formValue);
    this.staffService.update(formValue).subscribe((res) => {
      this.getStaffDetails();
    });
  }

  getStaffDetails(){
    this.isLoading = true;
    this.staffService.getById(this.staffDetails)
    .subscribe(res=>{
      this.staffDetails = res;
      this.isLoading = false;
      this.showForm = false;
    })
  }

  onDeleteClicked(){
    this.staffService.deleteById(this.staffDetails)
    .subscribe(res=>this.staffService.setListChange(this.staffDetails.id));
  }

  onEditClicked(){
    this.showForm= true;
    this.staffMemberForm.patchValue(this.staffDetails);
  }

  onCancel(){
    this.staffMemberForm.reset();
    this.showForm = false;
  }

  onChangleFile(event: any) {
    this.selectedPicture = event.target.files[0];
  }

}
