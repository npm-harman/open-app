import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import { HomeService } from 'src/app/shared/shared/services/home.service';
import { ServiceListService } from 'src/app/shared/shared/services/service-list.service';
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
  bId: Number;
  adList = adList;
  staffScreening = staffScreening;
  cleaningAndSanitization = cleaningAndSanitization;
  details: any = null;
  isLoading = false;
  appointmentForm: FormGroup;
  active = 1;
  serviceList: any = [];
  availableAppointments: any = [];

  images: any = [];
  imageEndpoint = environment.assetsEndPoint;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appToastService: AppToastService,
    private homeService: HomeService,
    private serviceListService: ServiceListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bId = params['bId'];
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

  getDetails(){
    this.isLoading = true;
    this.homeService.getBusinessById(this.bId)
    .subscribe(res=>{
      this.details = res;
      this.images.push(res.image1);
      this.images.push(res.image2);
      this.images.push(res.image3);
      this.getServices()
    })
  }

  getServices(){
    this.serviceListService.getAll(this.bId)
    .subscribe(res =>{
      this.serviceList = res;
      this.isLoading = false;
    });
  }

  onDateChange(){
    this.homeService.getBusinessAvailabilityByDate(this.bId, new Date(this.appointmentForm.value.date))
    .subscribe(res=>{
      this.availableAppointments= res[0].availableAppointments;
      console.log(this.availableAppointments);
    })
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
