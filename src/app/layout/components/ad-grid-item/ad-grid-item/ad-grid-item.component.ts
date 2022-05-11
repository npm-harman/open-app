import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-ad-grid-item',
  templateUrl: './ad-grid-item.component.html',
  styleUrls: ['./ad-grid-item.component.scss']
})
export class AdGridItemComponent implements OnInit {

  @Input() adDetails: any;
  imageEndpoint = environment.assetsEndPoint;

  constructor() { }

  ngOnInit(): void {
  }

}
