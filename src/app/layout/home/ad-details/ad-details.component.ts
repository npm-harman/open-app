import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import { AppointmentService } from 'src/app/shared/shared/services/appointment.service';
import { HomeService } from 'src/app/shared/shared/services/home.service';
import { ServiceListService } from 'src/app/shared/shared/services/service-list.service';
import { StaffService } from 'src/app/shared/shared/services/staff.service';
import { AppToastService } from 'src/app/utils/app-toast.service';
import {
  adList,
  staffScreening,
  cleaningAndSanitization,
} from 'src/constants/ad-list';
import { BusinessSignupService } from '../../business-home/business-signup/business-signup-form/business-signup.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
})
export class AdDetailsComponent implements OnInit {
  bId: Number;
  adList = adList;
  staffScreening = staffScreening;
  cleaningAndSanitization = cleaningAndSanitization;
  details: any = null;
  isLoading = false;
  appointmentForm: FormGroup;
  active = 1;
  serviceList: any = [];
  staffList: any = [];
  availableAppointments: any = [];
  availableStaff: any = [];

  images: any = [];
  imageEndpoint = environment.assetsEndPoint;
  subscription: any = null;
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appToastService: AppToastService,
    private homeService: HomeService,
    private serviceListService: ServiceListService,
    private businessSignupService: BusinessSignupService,
    private appointmentService: AppointmentService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bId = params['bId'];
    });
    this.subscription = this.businessSignupService
      .getCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
      });
    this.getDetails();
    this.initAppointmentForm();
  }

  initAppointmentForm() {
    this.appointmentForm = this.fb.group({
      serviceId: [null, Validators.required],
      date: [null, Validators.required],
      startDateTime: [null, Validators.required],
      bId: this.bId,
      uId: this.currentUser ? this.currentUser.id : null,
      staffId: null,
      notes: '',
    });
  }

  getDetails() {
    this.isLoading = true;
    this.homeService.getBusinessById(this.bId).subscribe((res) => {
      this.details = res;
      this.images.push(res.image1);
      this.images.push(res.image2);
      this.images.push(res.image3);
      this.getServices();
    });
  }

  getServices() {
    this.serviceListService.getAll(this.bId).subscribe((res) => {
      this.serviceList = res;
      this.getStaff();
    });
  }

  getStaff() {
    this.staffService.getAll(this.bId).subscribe((res) => {
      this.staffList = res;
      this.isLoading = false;
    });
  }

  onDateChange() {
    this.homeService
      .getBusinessAvailabilityByDate(
        this.bId,
        new Date(this.appointmentForm.value.date)
      )
      .subscribe((res) => {
        this.availableAppointments = res[0].availableAppointments;
        console.log(this.availableAppointments);
      });
  }

  onSelectTime() {
    this.availableStaff=[];
    this.appointmentForm.value.startDateTime.availableStaff.forEach((id: Number) => {
      this.availableStaff.push(
        this.staffList.filter((staffDetails: any) => staffDetails.id === id)[0]
      );
    });
    this.appointmentForm.get('staffId')?.setValue(this.availableStaff[0].id);
  }

  onSubmit() {
    this.isLoading = true;
    let formData = this.appointmentForm.value;
    formData.uId = this.currentUser.id;
    formData.startDateTime = formData.startDateTime.time;
    this.appointmentService
      .bookAppointment(this.appointmentForm.value)
      .subscribe((res) => {
        this.showSuccess();
        this.appointmentForm.reset();
        this.isLoading = false;
      });
  }

  showSuccess() {
    this.appToastService.show({
      message: 'Booking successful! A confirmation email has been sent to you.',
      class: 'bg-success text-light',
      delay: 10000,
    });
  }
}
