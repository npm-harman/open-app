import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { serviceList } from 'src/constants/staff-list';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  
  @Input() allowEdit: any;
  serviceForm: FormGroup;
  serviceList = serviceList;
  showForm: any = false;
  imageUrl: any = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.allowEdit);
  }

  initForm() {
    this.serviceForm = this.fb.group({
      name: [null, Validators.required],
      picture: null,
      desc: null,
      time: null,
      price: null,
    });
  }

  onAddServiceClicked() {
    this.showForm = true;
  }

  onSubmit() {
    console.log(this.serviceForm.value);
  }

  onCancel() {
    this.serviceForm.reset();
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
