import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environment';
import { PictureService } from '../services/picture.service';
import { ServiceListService } from '../services/service-list.service';

@Component({
  selector: 'app-service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.scss'],
})
export class ServiceListItemComponent implements OnInit {
  @Input() serviceDetails: any;
  @Input() allowEdit: any;
  @Input() bId: Number;
  selectedPicture: any = null;
  isLoading: boolean = false;

  serviceForm: FormGroup;
  showForm: any = false;
  imageEndpoint = environment.assetsEndPoint;

  constructor(
    private fb: FormBuilder,
    private serviceListService: ServiceListService,
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.serviceForm = this.fb.group({
      serviceName: [null, Validators.required],
      picture: null,
      desc: null,
      time: [null, Validators.required],
      cost: null,
      bId: null,
      id: null,
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.selectedPicture) {
      const formData = new FormData();
      formData.append('file', this.selectedPicture);
      this.pictureService.upload(formData).subscribe((res) => {
        this.updateService(res.filename);
      });
    } else {
      this.updateService(null);
    }
  }

  updateService(fileName: any) {
    let formValue = this.serviceForm.value;
    formValue.picture = fileName ? fileName : formValue.picture;
    this.serviceListService.update(formValue).subscribe((res) => {
      this.getServiceDetails();
    });
  }

  getServiceDetails(){
    this.isLoading = true;
    this.serviceListService.getById(this.serviceDetails.id)
    .subscribe(res=>{
      this.serviceDetails = res;
      this.isLoading = false;
      this.showForm = false;
    })
  }

  onDeleteClicked(){
    this.serviceListService.deleteById(this.serviceDetails.id)
    .subscribe(res=>this.serviceListService.setServiceListChange(this.serviceDetails.id));
  }

  onEditClicked() {
    this.showForm = true;
    this.serviceForm.patchValue(this.serviceDetails);
  }

  onCancel() {
    this.serviceForm.reset();
    this.showForm = false;
  }

  onChangleFile(event: any) {
    this.selectedPicture = event.target.files[0];
  }
}
