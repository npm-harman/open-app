import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ngfDrop } from 'angular-file';

@Component({
  selector: 'app-business-general',
  templateUrl: './business-general.component.html',
  styleUrls: ['./business-general.component.scss'],
})
export class BusinessGeneralComponent implements OnInit {
  @Input() allowEdit: boolean;
  files: File[] = [];
  lastFileAt: Date;
  showForm = false;

  dragFiles: any;
  validComboDrag: any;
  lastInvalids: any;
  fileDropDisabled: any;

  tempDesc =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1500/300`
  );

  constructor() {}

  ngOnInit(): void {}

  getDate() {
    return new Date();
  }

  onSubmit() {
    // console.log(this.serviceForm.value)
  }

  onEditClicked() {
    this.showForm = true;
    // this.serviceForm.patchValue(this.serviceDetails);
  }

  onCancel() {
    // this.serviceForm.reset();
    this.showForm = false;
  }
}
