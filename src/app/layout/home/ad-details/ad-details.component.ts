import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppToastService } from 'src/app/utils/app-toast.service';
import {
  adList,
  staffScreening,
  cleaningAndSanitization,
} from 'src/constants/ad-list';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
})
export class AdDetailsComponent implements OnInit {
  id = null;
  adList = adList;
  staffScreening = staffScreening;
  cleaningAndSanitization = cleaningAndSanitization;
  details: any = null;
  isLoading = false;
  appointmentForm: FormGroup;
  active = 1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appToastService: AppToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.getDetails();
    this.initAppointmentForm();
  }

  initAppointmentForm() {
    this.appointmentForm = this.fb.group({
      serviceId: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
    });
  }

  getDetails() {
    this.isLoading = true;
    this.details = this.adList.filter((ad) => ad.id == this.id)[0];
    this.isLoading = false;
  }

  onSubmit() {
    console.log('Submit');
    this.isLoading = true;
    setTimeout(() => {
      this.showSuccess();
      this.appointmentForm.reset();
    }, 500);
 
  }
  showSuccess() {
    this.appToastService.show({
      message: 'Booking successful! A confirmation email has been sent to you.',
      class: 'bg-success text-light',
      delay: 10000,
    });
    this.isLoading = false
  }
}
