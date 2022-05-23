import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  @Input() isBusiness: boolean;
  @Input() id: Number;

  appointmentList: any = [];
  isLoading: boolean = false;
  subscription: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.subscription = this.appointmentService.listChange.subscribe(res=>this.getAppointments());
  }

  getAppointments() {
    this.isLoading = true;
    if (this.isBusiness) {
      this.appointmentService.getAllByBusinessId(this.id).subscribe((res) => {
        this.loadAppointments(res);

      });
    } else {
      this.appointmentService.getAllByUserId(this.id).subscribe((res) => {
        this.loadAppointments(res);
      });
    }
  }

  loadAppointments(data: any){
    const uniqApps = _.uniqBy(data, 'slotId');
    this.appointmentList = uniqApps;
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
