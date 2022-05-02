import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {

  @Input() allowEdit: any;
  businessHoursForm: FormGroup;
  showForm: any = false;
  days = [{num: 1, name: "Monday"}, {num: 2, name: "Tuesday"}, {num:3, name: "Wednesday"}, {num: 4, name:'Thursday'}, {num: 5, name:'Friday'}, {num: 6, name: 'Sataurday'}, {num: 7, name: 'Sunday' }]

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let businessHours = new FormArray([]);
    this.businessHoursForm = this.fb.group({
      businessHours: businessHours
    });
    this.initBusinessDays();
    this.businessHoursForm.disable();
  }

  initBusinessDays() {
    this.days.forEach((day, index) => {
      (<FormArray>this.businessHoursForm.get('businessHours')).push(
        new FormGroup({
          day: new FormControl(day.name),
          isWorking: new FormControl(index < 5),
          start: new FormControl({
            value: index >= 5 ? null : '08:00:00',
            disabled: index >= 5,
          }),
          end: new FormControl({
            value: index >= 5 ? null : '17:00:00',
            disabled: index >= 5,
          }),
        })
      );
    });
  }

  getBusinessHoursControl() {
    return (<FormArray>this.businessHoursForm.get('businessHours')).controls;
  }

  onChangeIsWorking(index: number) {
    let isWorking = (<FormArray>this.businessHoursForm.get('businessHours')).controls[
      index
    ].get('isWorking')?.value;
    console.log(
      (<FormArray>this.businessHoursForm.get('businessHours')).controls[index].get(
        'start'
      )?.value
    );
    let start = (<FormArray>this.businessHoursForm.get('businessHours')).controls[
      index
    ].get('start');
    let end = (<FormArray>this.businessHoursForm.get('businessHours')).controls[
      index
    ].get('end');
    if (isWorking) {
      start?.setValue('08:00:00');
      end?.setValue('17:00:00');
      start?.enable();
      end?.enable();
    } else {
      start?.setValue(null);
      end?.setValue(null);
      start?.disable();
      end?.disable();
    }
  }

  onSubmit(){
    console.log(this.businessHoursForm.value);
  }

  onEditClicked(){
    this.businessHoursForm.enable();
  }

  onCancel(){
    this.businessHoursForm.disable();
  }

}
