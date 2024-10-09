import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/commons/service/common.service';
import { AppSettings } from 'src/app/commons/setting/app_setting';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  public skeletonLoader:boolean=false
  public page = 1;
  public blogData:any;

  public blog:any = {
    id: 1,
    title: 'Angular Basics',
    content: 'This is a detailed post about Angular...',
    author: 'John Doe',
    tags: ['Angular', 'JavaScript', 'Web Development'],
    views: 0,
    createdAt: new Date('2023-10-01')
  }

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }


  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'],'snapshoy')
    this.getBlogData()
  }


  getAPIParam() {
    let APIparams, params;
    let url;
    url = AppSettings.APIsNameArray.BLOG.blogs + '/' + this.route.snapshot.params['id'];
    APIparams = {
      apiKey: url,
      uri: this.commonService.getAPIUriFromParams(params),
    };
    return APIparams;
  }
  getBlogData() {
    var APIparams = this.getAPIParam();
    this.commonService.getList(APIparams).subscribe((ServerRes) => {
      console.log(ServerRes,'--ServerRes')
      if(ServerRes.success === true) {
        this.blogData = ServerRes.response;
      }
     
    });
  }


}
