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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      category: [null],
      date: [null],
      time: [null],
      location: [null]
    });
  }

}
