import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-grid-item',
  templateUrl: './ad-grid-item.component.html',
  styleUrls: ['./ad-grid-item.component.scss']
})
export class AdGridItemComponent implements OnInit {

  @Input() adDetails: any;

  constructor() { }

  ngOnInit(): void {
  }

}
