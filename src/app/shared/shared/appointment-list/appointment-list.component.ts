import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  @Input() isBusiness: boolean;
  @Input() id: Number;

  appointmentList = [];
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
        this.appointmentList = res;
        this.isLoading = false;
      });
    } else {
      this.appointmentService.getAllByUserId(this.id).subscribe((res) => {
        this.appointmentList = res;
        this.isLoading = false;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
