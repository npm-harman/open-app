import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-grid',
  templateUrl: './ad-grid.component.html',
  styleUrls: ['./ad-grid.component.scss']
})
export class AdGridComponent implements OnInit {

  @Input() adList: any;

  constructor() { }

  ngOnInit(): void {
  }

}
