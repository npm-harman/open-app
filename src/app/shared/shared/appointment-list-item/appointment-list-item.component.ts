import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environment';
import { AppointmentService } from '../services/appointment.service';
import { HomeService } from '../services/home.service';
import { ServiceListService } from '../services/service-list.service';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-appointment-list-item',
  templateUrl: './appointment-list-item.component.html',
  styleUrls: ['./appointment-list-item.component.scss']
})
export class AppointmentListItemComponent implements OnInit {

  @Input() details: any;

  isLoading: boolean = false;
  serviceDetails: any = null;
  staffDetails: any = null;
  businessDetails: any;

  appointmentForm: FormGroup;
  showForm: any = false;
  imageEndpoint = environment.assetsEndPoint;

  constructor(
    private fb: FormBuilder,
    private serviceListService: ServiceListService,
    private homeService: HomeService,
    private staffService: StaffService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.getBusinessDetails();
  }

  getBusinessDetails() {
    this.isLoading = true;
    this.homeService.getBusinessById(this.details.bId).subscribe((res) => {
      this.businessDetails = res;
      this.getServiceById();
    });
  }

  getServiceById() {
    this.serviceListService.getById(this.details.serviceId).subscribe((res) => {
      this.serviceDetails = res;
      this.getStaffById();
    });
  }

  getStaffById() {
    this.staffService.getById({bId: this.details.bId, id: this.details.staffId}).subscribe((res) => {
      this.staffDetails = res;
      this.isLoading = false;
    });
  }

  onSubmit() {
    // this.isLoading = true;
    console.log(this.appointmentForm.value)
  }

  onDeleteClicked(){
    this.appointmentService.delete(this.details.appId)
    .subscribe(res=>this.appointmentService.setListChange(this.details.appId)
    )
  }
}
