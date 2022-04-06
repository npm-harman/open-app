import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { adList } from 'src/constants/ad-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  categories = ['Auto Shops', 'Beauty Salons'];
  adList=adList;
  filteredList: any = adList;
  isLoading = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createSearchForm();
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      category: [null],
      date: [null],
      time: [null],
      location: [null]
    });
  }

  onSubmit(){
    this.isLoading = true;
    const formData = this.searchForm.value;
    let temp: any[] | null = null;
    if(formData.category != "null"){
      temp = adList.filter(ad => ad.category == formData.category);
    }else{
      temp = this.adList;
    }
    if(formData.location){
      temp = temp ? temp.filter(ad => ad.city.toLowerCase() == formData.location.toLowerCase()): [];
    }
    setTimeout(() => {
    this.filteredList = temp;
      this.isLoading = false;
    }, 500);
  }

}
