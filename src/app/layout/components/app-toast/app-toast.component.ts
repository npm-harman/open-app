import { Component, OnInit } from '@angular/core';
import { AppToastService } from 'src/app/utils/app-toast.service';

@Component({
  selector: 'app-app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.scss']
})
export class AppToastComponent implements OnInit {

  constructor(public toastService: AppToastService) { }

  ngOnInit(): void {
  }

}
