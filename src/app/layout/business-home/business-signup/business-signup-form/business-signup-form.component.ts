import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BusinessSignupService } from './business-signup.service';

@Component({
  selector: 'app-business-signup-form',
  templateUrl: './business-signup-form.component.html',
  styleUrls: ['./business-signup-form.component.scss'],
})
export class BusinessSignupFormComponent implements OnInit {
  signupForm: FormGroup;
  step = 1;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;

  constructor(private fb: FormBuilder, private businessSignupService: BusinessSignupService) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    let businessHoursForDay = new FormArray([]);
    let staffMembers = new FormArray([]);
    let services = new FormArray([]);
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(40)]],
      lastName: [null, [Validators.required, Validators.maxLength(40)]],
      emailId: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      bName: [null, [Validators.required, Validators.maxLength(40)]],
      phone: [null, Validators.required],
      bCity: [null, [Validators.required, Validators.maxLength(40)]],
      bState: [null, [Validators.required, Validators.maxLength(40)]],
      bZip: [null, [Validators.required, Validators.maxLength(40)]],
      bType: [null, [Validators.required, Validators.maxLength(40)]],
      businessHours: businessHoursForDay,
      staffMembers: staffMembers,
      services: services
    });
    this.initBusinessDays();
  }

  initBusinessDays() {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Sataurday',
      'Sunday',
    ];
    days.forEach((day, index) => {
      (<FormArray>this.signupForm.get('businessHours')).push(
        new FormGroup({
          day: new FormControl(day),
          isWorking: new FormControl(index < 5),
          start: new FormControl({
            value: index >= 5 ? null : '08:00',
            disabled: index >= 5,
          }),
          end: new FormControl({
            value: index >= 5 ? null : '17:00',
            disabled: index >= 5,
          }),
        })
      );
    });
  }

  getBusinessHoursControl() {
    return (<FormArray>this.signupForm.get('businessHours')).controls;
  }

  getStaffMembersControl() {
    return (<FormArray>this.signupForm.get('staffMembers')).controls;
  }

  getServicesControl() {
    return (<FormArray>this.signupForm.get('services')).controls;
  }

  onChangeIsWorking(index: number) {
    let isWorking = (<FormArray>this.signupForm.get('businessHours')).controls[
      index
    ].get('isWorking')?.value;
    console.log(
      (<FormArray>this.signupForm.get('businessHours')).controls[index].get(
        'start'
      )?.value
    );
    let start = (<FormArray>this.signupForm.get('businessHours')).controls[
      index
    ].get('start');
    let end = (<FormArray>this.signupForm.get('businessHours')).controls[
      index
    ].get('end');
    if (isWorking) {
      start?.setValue('08:00');
      end?.setValue('17:00');
      start?.enable();
      end?.enable();
    } else {
      start?.setValue(null);
      end?.setValue(null);
      start?.disable();
      end?.disable();
    }
  }

  onAddStaffMember() {
    (<FormArray>this.signupForm.get('staffMembers')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
      })
    );
  }

  onRemoveStaffMember(index: number){
    (<FormArray>this.signupForm.get('staffMembers')).removeAt(index);
  }

  onAddService() {
    (<FormArray>this.signupForm.get('services')).push(
      new FormGroup({
        serviceName: new FormControl(null, Validators.required),
        time: new FormControl(null),
        price: new FormControl(null),
      })
    );
  }

  onRemoveService(index: number){
    (<FormArray>this.signupForm.get('services')).removeAt(index);
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.step = this.step + 1;

    const registerBussiness = {
      user: {
        firstName: 'Aditya ',
        lastName: 'Jagtap',
        phoneNumber: '8855019299',
        emailId: 'adityavj2010@gmail.com',
      },
      business: {
        bName: 'Adityas saloon',
        bCity: 'Buffalo',
        bState: 'NY',
        bType: 'saloon',
        bZip: '14214',
      },
      staff: [
        {
          firstName: 'pehla chamcha',
          emailId: 'pehlachamcha@gmail.com',
        },
      ],
      businessServices: [
        {
          serviceName: 'Hair cut',
          cost: 20,
          time: 30,
        },
        {
          serviceName: 'Beard shaping',
          cost: 10,
          time: 20,
        },
      ],
      businessHours: [
        {
          startTime: 10,
          endTime: 17,
          day: 1,
        },
        {
          startTime: 10,
          endTime: 17,
          day: 2,
        },
        {
          startTime: 10,
          endTime: 17,
          day: 3,
        },
      ],
    };

    this.businessSignupService.registerBusiness(registerBussiness)
    .subscribe(res=>{
      console.log(res);
    })
  }

}
