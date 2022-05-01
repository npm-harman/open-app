import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.scss']
})
export class ServiceListItemComponent implements OnInit {

  @Input() serviceDetails: any;
  @Input() allowEdit: any;
  serviceForm: FormGroup;
  showForm: any = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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

  onSubmit(){
    console.log(this.serviceForm.value)
  }

  onEditClicked(){
    this.showForm= true;
    this.serviceForm.patchValue(this.serviceDetails);
  }

  onCancel(){
    this.serviceForm.reset();
    this.showForm = false;
  }

}

