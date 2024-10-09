import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../commons/service/common.service';
import { AppSettings } from '../../commons/setting/app_setting';
import { AlertService } from '../../commons/service/alert.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
export interface DialogData {
  openPop: string;
  title: any;
  content:any;
  id:any;
  tags:any;
}

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  public errorMessage: any;
  public submitted = false;
  public loading = false;
  public getUserData: any;
  skeletonLoader: boolean;
  public blogForm: FormGroup;
  public inputValue:any
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  blogTags: Fruit[] = [];
  editingIndex: number | null = null;
tempName: string = '';
  constructor(
    public alertService: AlertService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    // private datePipe: DatePipe,
  ) {
   }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: [this.data?.title ? this.data?.title : '', [Validators.required]],
      content: [this.data?.content ? this.data?.content : '', [Validators.required]],
      tags: this.formBuilder.array([], Validators.required)
    });

    if (this.data?.tags) {
      this.populateTags(this.data.tags);
    }
   
  }

  populateTags(tags: string[]): void {
    tags.forEach(tag => {
      this.tags.push(this.formBuilder.control(tag));
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'fail' });
  }
  onYesClick(): void {
    this.dialogRef.close({ event: 'ok' });
  }

  

  blogFormSubmit({value, valid}) {
    value.tags= value.tags.map(tag => tag), // Array of tag names
    this.submitted = true
    if (valid) {
      this.loading = true;
      let APIparams
      if (this.data.openPop === 'createBlog') {
        APIparams = {
          apiKey: AppSettings.APIsNameArray.BLOG.blogs,
          uri: '',
          postBody: value,
        };
        this.commonService.post(APIparams).subscribe(
          (success) => {
            if (success.success === true) {
              this.errorMessage = null

              this.loading = false;
              this.submitted = false
              this.alertService.showNotificationMessage(
                'success',
                'bottom',
                'left',
                'txt_s',
                'check_circle',
                'Blog',
                'You have successfully updated blog.'
              );
              this.dialogRef.close({ event: 'ok' });


            } else if (success.success === false) {
              this.loading = false;
              this.submitted = false
              this.errorMessage = success.message

              this.alertService.showNotificationMessage(
                'danger',
                'bottom',
                'left',
                'txt_d',
                'check_circle',
                'Blog',
                'You have not successfully updated blog.'
              );
            }
          },
          (error) => {
            this.alertService.showNotificationMessage(
              'danger',
              'bottom',
              'left',
              'txt_g',
              'error',
              'Unexpected Error',
              AppSettings.ERROR
            );
            this.loading = false;
            this.submitted = false
            this.errorMessage = error.error.message;
          }
        );
      }
      else {
        APIparams = {
          apiKey: AppSettings.APIsNameArray.BLOG.blogs + '/' + this.data?.id,
          uri: '',
          postBody: value,
        };
        this.commonService.put(APIparams).subscribe(
          (success) => {
            this.loading = false;
            if (success.success === true) {

              this.alertService.showNotificationMessage(
                'success',
                'bottom',
                'left',
                'txt_s',
                'check_circle',
                'Blog',
                'You have successfully updated blog.'
              );
              this.dialogRef.close({ event: 'ok' });

            } else if (success.success === false) {
              this.errorMessage = success.message

              this.alertService.showNotificationMessage(
                'danger',
                'bottom',
                'left',
                'txt_d',
                'check_circle',
                'Blog',
                'You have not successfully updated blog.'
              );
            }
          },
          (error) => {
            this.alertService.showNotificationMessage(
              'danger',
              'bottom',
              'left',
              'txt_g',
              'error',
              'Unexpected Error',
              AppSettings.ERROR
            );
            this.loading = false;
          }
        );
      }

    }

  }
  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }


  
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add the new tag from user input
    if ((value || '').trim()) {
      this.tags.push(this.formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  removeTag(index: number): void {
    this.tags.removeAt(index);
  }
  
  editBlogTag(index: number, name: string): void {
    this.editingIndex = index;
    this.tempName = name;
  }
  
  updateName(index: number): void {
    if (this.tempName.trim()) {
      this.blogTags[index].name = this.tempName.trim();
    }
    this.editingIndex = null; // Exit edit mode
    this.tempName = ''; // Clear temp name
  }

 
  // calling getApi for crrier type 
  getUserProfile() {
    this.skeletonLoader = true
    let uri = null;
    let newParams = {};
    if (newParams) uri = this.commonService.getAPIUriFromParams(newParams);
    let APIparams = {
      apiKey: AppSettings.APIsNameArray.USER.USER,
      uri: uri,
    };
    this.commonService.getList(APIparams).subscribe((ServerRes) => {
      if (ServerRes.success === true) {
        this.getUserData = ServerRes.response;
    this.skeletonLoader = false

      } else {
    this.skeletonLoader = false

      }
    })
  }
 

}
