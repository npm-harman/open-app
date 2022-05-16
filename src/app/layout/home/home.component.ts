import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/shared/shared/services/home.service';
import { formatDate } from '@angular/common';
import { categories } from 'src/constants/constants';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  categories = categories;
  adList = [];
  filteredList: any = [];
  isLoading = false;
  latitude: number;
  longitude: number;
  cities: any = null;

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.getAllBusiness();
    this.setCurrentLocation();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      category: [null],
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      time: [null],
      city: [null],
    });
  }

  getAllBusiness(date = new Date()) {
    this.isLoading = true;

    this.homeService.getAllBusiness(date).subscribe((res) => {
      this.adList = res;
      this.filteredList = res;
      this.cities = _.orderBy(
        _.uniqBy(res, 'bCity'),
        [(item: any) => item.bCity.toLowerCase()],
        ['asc']
      );
      this.onSelectCategoryOrCity();
      this.cities = _.orderBy(
        _.uniqBy(this.filteredList, 'bCity'),
        [(item: any) => item.bCity.toLowerCase()],
        ['asc']
      );
      this.isLoading = false;
    });
  }

  onSelectDate() {
    if (this.searchForm.value.date) {
      this.getAllBusiness(new Date(this.searchForm.value.date));
    } else {
      this.getAllBusiness();
    }
  }

  onSelectCategoryOrCity() {
    if (this.searchForm.value.category) {
      this.filteredList = _.filter(this.adList, {
        bType: this.searchForm.value.category,
      });
    }
    if(this.searchForm.value.city){
      this.filteredList = _.filter(this.filteredList, {
        bCity: this.searchForm.value.city,
      });
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  onClear() {
    this.getAllBusiness();
    this.searchForm.reset();
    this.searchForm.get('date')?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  }
}
