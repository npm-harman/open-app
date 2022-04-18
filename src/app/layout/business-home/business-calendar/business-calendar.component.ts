import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { addDays } from 'date-fns';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-business-calendar',
  templateUrl: './business-calendar.component.html',
  styleUrls: ['./business-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;

  events$: Observable<CalendarEvent<{ film: Film }>[]>;

  activeDayIsOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  event: CalendarEvent[] = [
    {
      title: 'Resizable event',
      start: new Date(),
      end: addDays(new Date(), 1),
    },
    {
      title: 'A non resizable event',
      start: new Date(),
      end: addDays(new Date(), 1),
    },
  ];

  getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
  }
  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'yyyy-MM-dd')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'yyyy-MM-dd')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: any) => {
          return results.map((film: any) => {
            return {
              title: film.title,
              start: new Date(
                film.release_date + this.getTimezoneOffsetString(this.viewDate)
              ),
              end: addDays(new Date(), 1),

              color: 'yellow',
              allDay: true,
              meta: {
                film,
              },
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  // eventClicked(event: CalendarEvent<{ film: Film }>): void {
  //   window.open(
  //     `https://www.themoviedb.org/movie/${event.meta.film.id}`,
  //     '_blank'
  //   );
  // }
}
