import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  openTab = 'personal';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.openTab = params['openTab'] ? params['openTab'] : 'personal';
      console.log(this.openTab);
    });
  }

}
