import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from 'src/app/shared/shared/services/home.service';
import { adList } from 'src/constants/ad-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  categories = ['Auto Shops', 'Beauty Salons'];
  adList = adList;
  filteredList: any = adList;
  isLoading = false;

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.getAllBusiness();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      category: [null],
      date: new Date(),
      time: [null],
      location: [null],
    });
  }

  getAllBusiness() {
    this.isLoading = true;
    this.homeService.getAllBusiness(new Date()).subscribe((res) => {
      this.adList = res;
      this.filteredList = res;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.isLoading = true;
    const formData = this.searchForm.value;
    let temp: any[] | null = null;
    if (formData.category != 'null') {
      temp = adList.filter((ad) => ad.category == formData.category);
    } else {
      temp = this.adList;
    }
    if (formData.location) {
      temp = temp
        ? temp.filter(
            (ad) => ad.city.toLowerCase() == formData.location.toLowerCase()
          )
        : [];
    }
    setTimeout(() => {
      this.filteredList = temp;
      this.isLoading = false;
    }, 500);
  }
}
