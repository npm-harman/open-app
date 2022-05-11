import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { serviceList } from 'src/constants/staff-list';
import { PictureService } from '../services/picture.service';
import { ServiceListService } from '../services/service-list.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  @Input() allowEdit: any;
  @Input() bId: Number;

  serviceForm: FormGroup;
  serviceList = [];
  showForm: any = false;
  imageUrl: any = null;
  selectedPicture: any = null;
  isLoading: boolean = false;
  subscription: any;

  constructor(
    private fb: FormBuilder,
    private pictureService: PictureService,
    private serviceListService: ServiceListService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.serviceListService.serviceListChange.subscribe(res=>this.getServices());
  }

  initForm() {
    this.serviceForm = this.fb.group({
      serviceName: [null, Validators.required],
      picture: null,
      desc: null,
      time: null,
      cost: null,
      bId: this.bId
    });
  }

  onAddServiceClicked() {
    this.serviceForm.reset();
    this.showForm = true;
  }

  onSubmit() {
    if (this.selectedPicture) {
      const formData = new FormData();
      formData.append('file', this.selectedPicture);
      this.pictureService.upload(formData).subscribe((res) => {
        this.addService(res.filename);
      });
    } else {
      this.addService(null);
    }
  }

  addService(fileName: any) {
    let formValue = this.serviceForm.value;
    formValue.picture = fileName;
    formValue.bId = this.bId;
    this.serviceListService.add(formValue).subscribe((res) => {
      this.showForm = false;
      this.getServices();
    });
  }

  onCancel() {
    this.serviceForm.reset();
    this.showForm = false;
  }

  updateImageUrl(e: any) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  onChangleFile(event: any) {
    this.selectedPicture = event.target.files[0];
  }

  getServices(){
    this.isLoading = true;
    this.serviceListService.getAll(this.bId)
    .subscribe(res =>{
      this.serviceList = res;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
