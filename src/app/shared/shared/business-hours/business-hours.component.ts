import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BusinessHoursService } from '../services/business-hours.service';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss'],
})
export class BusinessHoursComponent implements OnInit {
  @Input() allowEdit: any;
  @Input() bId: Number;

  businessHoursForm: FormGroup;
  showForm: any = false;
  isLoading = false;

  days = [
    { num: 0, name: 'Sunday' },
    { num: 1, name: 'Monday' },
    { num: 2, name: 'Tuesday' },
    { num: 3, name: 'Wednesday' },
    { num: 4, name: 'Thursday' },
    { num: 5, name: 'Friday' },
    { num: 6, name: 'Sataurday' },
  ];

  constructor(
    private fb: FormBuilder,
    private businessHoursService: BusinessHoursService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getHours();
  }

  initForm() {
    let businessHours = new FormArray([]);
    this.businessHoursForm = this.fb.group({
      businessHours: businessHours,
    });
  }

  initBusinessDays(data: any[]) {
    (<FormArray>this.businessHoursForm.get('businessHours')).clear();
    this.days.forEach((day, index) => {
      let dayData = {
        day: day.num,
        startTime: null,
        endTime: null,
        isWorking: false,
      };
      if (data.length) {
        dayData = data.filter((d) => d.day == day.num)[0];
      }
      (<FormArray>this.businessHoursForm.get('businessHours')).push(
        new FormGroup({
          bId: new FormControl(this.bId),
          day: new FormControl({ value: dayData.day, disabled: true }),
          isWorking: new FormControl(dayData.isWorking),
          startTime: new FormControl({
            value: dayData.startTime,
            disabled: true,
          }),
          endTime: new FormControl({
            value: dayData.endTime,
            disabled: true,
          }),
        })
      );
    });
    this.isLoading = false;
    this.businessHoursForm.disable();
  }

  getBusinessHoursControl() {
    return (<FormArray>this.businessHoursForm.get('businessHours')).controls;
  }

  onChangeIsWorking(index: number) {
    let isWorking = (<FormArray>(
      this.businessHoursForm.get('businessHours')
    )).controls[index].get('isWorking')?.value;
    console.log(
      (<FormArray>this.businessHoursForm.get('businessHours')).controls[
        index
      ].get('startTime')?.value
    );
    let startTime = (<FormArray>(
      this.businessHoursForm.get('businessHours')
    )).controls[index].get('startTime');
    let endTime = (<FormArray>(
      this.businessHoursForm.get('businessHours')
    )).controls[index].get('endTime');
    if (isWorking) {
      startTime?.setValue('08:00:00');
      endTime?.setValue('17:00:00');
      startTime?.enable();
      endTime?.enable();
    } else {
      startTime?.setValue(null);
      endTime?.setValue(null);
      startTime?.disable();
      endTime?.disable();
    }
  }

  getHours() {
    this.isLoading = true;
    this.businessHoursService.get(this.bId).subscribe((res) => {
      if (res.length > 0) {
        this.initBusinessDays(res);
      } else {
        this.initBusinessDays([]);
      }
    });
  }

  onSubmit() {
    this.businessHoursService.add(this.businessHoursForm.value.businessHours)
    .subscribe(res=>this.getHours());
  }

  onEditClicked() {
    this.businessHoursForm.enable();
  }

  onCancel() {
    this.businessHoursForm.disable();
  }
}
