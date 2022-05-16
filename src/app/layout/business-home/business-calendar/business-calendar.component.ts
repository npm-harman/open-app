import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isSameDay, isSameMonth, addMinutes } from 'date-fns';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ServiceListService } from 'src/app/shared/shared/services/service-list.service';
import { StaffService } from 'src/app/shared/shared/services/staff.service';
import { BusinessSignupService } from '../business-signup/business-signup-form/business-signup.service';
import { AppointmentService } from 'src/app/shared/shared/services/appointment.service';
import * as _ from 'lodash';

const red: any = {
  primary: '#dc3646',
  secondary: '#FAE3E3',
};

@Component({
  selector: 'app-business-calendar',
  templateUrl: './business-calendar.component.html',
  styleUrls: ['./business-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessCalendarComponent implements OnInit {
  constructor(
    private modal: NgbModal,
    private serviceListService: ServiceListService,
    private staffService: StaffService,
    private businessSignupService: BusinessSignupService,
    private appointmentService: AppointmentService
  ) {}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  private loadingComplete: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  serviceList: any = [];
  staffList: any = [];
  subscription: any = null;
  currentUser: any = null;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: CalendarEvent;
  refresh = new Subject<any>();
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  ngOnInit(): void {
    this.subscription = this.businessSignupService
      .getCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
      });
    this.getServices();
  }

  getServices() {
    this.loadingComplete.next(false);
    this.serviceListService.getAll(this.currentUser.bId).subscribe((res) => {
      this.serviceList = res;
      this.getStaff();
    });
  }

  getStaff() {
    this.staffService.getAll(this.currentUser.bId).subscribe((res) => {
      this.staffList = res;
      this.getAllAppointments();
    });
  }

  getAllAppointments() {
    this.appointmentService
      .getAllByBusinessId(this.currentUser.bId)
      .subscribe((res) => {
        this.addToCalendar(res);
        this.loadingComplete.next(true);
      });
  }

  addToCalendar(data = []) {
    this.events = [];
    const countMap = _.countBy(data, 'slotId');
    const uniqApps = _.uniqBy(data, 'slotId');
    uniqApps.forEach((appointment: any) => {
      const meta = {
        serviceDetails: this.serviceList.filter(
          (service: any) => service.id === appointment.serviceId
        )[0],
        staffDetails: this.staffList.filter(
          (staffDetails: any) => staffDetails.id === appointment.staffId
        )[0],
        ...appointment,
      };
      const calEv = {
        start: new Date(appointment.startDateTime),
        end: addMinutes(
          new Date(appointment.startDateTime),
          countMap[appointment.slotId] * 30
        ),
        title: meta.serviceDetails.serviceName,
        color: red,
        meta: meta,
      };
      this.events.push(calEv);
    });
    console.log(this.events);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(event: CalendarEvent): void {
    this.modalData = event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onCancelAppointment() {
    this.appointmentService
      .delete(this.modalData.meta.appId)
      .subscribe((res) => {
        this.modal.dismissAll();
        this.getAllAppointments();
      });
  }

  get load(): Observable<boolean> {
    return this.loadingComplete;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
