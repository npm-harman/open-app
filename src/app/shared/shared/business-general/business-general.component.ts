import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environment';
import { ngfDrop } from 'angular-file';
import { HomeService } from '../services/home.service';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-business-general',
  templateUrl: './business-general.component.html',
  styleUrls: ['./business-general.component.scss'],
})
export class BusinessGeneralComponent implements OnInit {
  @Input() allowEdit: boolean;
  @Input() bId: Number;

  files: File[] = [];
  lastFileAt: Date;
  showForm = false;
  details: any = null;
  isLoading = false;

  dragFiles: any;
  validComboDrag: any;
  lastInvalids: any;
  fileDropDisabled: any;
  description: any = null;
  imageEndpoint = environment.assetsEndPoint;
  images: any = []

  constructor(
    private pictureService: PictureService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    this.isLoading = true;
    this.homeService.getBusinessById(this.bId)
    .subscribe(res=>{
      this.details = res;
      this.description = res.description;
      this.images.push(res.image1);
      this.images.push(res.image2);
      this.images.push(res.image3);
      this.isLoading = false;
    })
  }

  getDate() {
    return new Date();
  }

  onSubmit() {
    this.details.description = this.description;
    if (this.files.length) {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      this.pictureService.upload(formData).subscribe((res) => {
        this.details.image1 = res.filename;
        formData.delete('file');
        if (this.files.length > 1) {
          formData.append('file', this.files[1]);
          this.pictureService.upload(formData).subscribe((res) => {
            this.details.image2 = res.filename;
            formData.delete('file');
            if (this.files.length > 2) {
              formData.append('file', this.files[2]);
              this.pictureService.upload(formData).subscribe((res) => {
                this.details.image3 = res.filename;
                this.update();
              });
            } else {
              this.update();
            }
          });
        } else {
          this.update();
        }
      });
    } else {
      this.update();
    }
  }

  update() {
    this.homeService.updateBusiness(this.details).subscribe((res) => {
      console.log(res);
    });
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
