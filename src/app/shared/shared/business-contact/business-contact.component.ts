import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-business-contact',
  templateUrl: './business-contact.component.html',
  styleUrls: ['./business-contact.component.scss'],
})
export class BusinessContactComponent implements OnInit {
  @Input() allowEdit: boolean;
  @Input() bId: Number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  geoCoder: any;
  showForm: any = false;
  details: any = null;
  isLoading = false;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  initMap() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      if (this.details.lat) {
        this.latitude = Number(this.details.lat);
        this.longitude = Number(this.details.long);
        this.getAddress(this.latitude, this.longitude);
      } else if (this.allowEdit) {
        this.setCurrentLocation();
      }
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
        });
      });
      this.isLoading = false;
    });
  }

  getDetails() {
    this.isLoading = true;
    this.homeService.getBusinessById(this.bId).subscribe((res) => {
      this.details = res;
      this.initMap();
    });
  }

  onMapClick(event: any) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 15;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  onEditClicked() {
    this.showForm = true;
  }

  onSubmit() {
    this.details.lat = this.latitude;
    this.details.long = this.longitude;
    this.homeService.updateBusiness(this.details).subscribe((res) => {
      this.showForm=false;
      this.getDetails();
    });
  }

  onCancel() {
    // this.serviceForm.reset();
    this.showForm = false;
  }
}
