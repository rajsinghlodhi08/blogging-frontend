import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';
import { AppSettings } from 'src/app/commons/setting/app_setting';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
// import { blogPosts } from 'src/app/commons/setting/status_setting';
import { CommonService } from 'src/app/commons/service/common.service';
import { AlertService } from 'src/app/commons/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogPosts:any[] = [];  // Array of posts
  public filteredPosts: any = this.blogPosts;  // Array for filtered posts
  public currentPage = 1;
  public title = '';
  public tags ='';
  public userType: any;
  public getTotalHeight: any;
  public page = 1;
  public totalPage = 1;
  public totalRecords: any;
  public blogList: any = [];
  public spinnerLoader = false;
  public dataNotFound = false;
  public accessToken:any;
  public selectedDropdown: number | null = null; // Store the index of the selected dropdown
  isExpanded: boolean[] = [];

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }




  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInsideDropdown = clickedElement.closest('.dropdown_container');
    // Close the dropdown if the click is outside of any dropdown
    if (!isInsideDropdown) {
      this.selectedDropdown = null;
    }
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event:any) {
    this.getTotalHeight = window.innerHeight + window.scrollY;
    if ($(window).scrollTop() + 1 >= $(document).height() - $(window).height()) {
      if (this.page !== this.totalPage && this.page >= 1 && this.totalPage && this.blogList.length > 0) {
        this.page = this.page + 1;
        this.spinnerLoader = true;
        this.dataNotFound = false;
         this.getMoreData();
      } else if (this.spinnerLoader === false) {
        this.dataNotFound = true;
      }
    }
  }



  // Method to toggle the dropdown menu
  toggleDropdown(index: number) {
    event.stopPropagation();
    if (this.selectedDropdown === index) {
      this.selectedDropdown = null; // Close the dropdown if the same card is clicked again
    } else {
      this.selectedDropdown = index; // Show dropdown for the clicked card
    }
  }

  // Placeholder methods for actions
  editBlog() {
    console.log("Edit blog clicked");
    // Logic for editing the blog goes here
  }

  deleteBlog() {
    console.log("Delete blog clicked");
    // Logic for deleting the blog goes here
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token')
    this.skeletonLoader = false;
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.title = params['title'];
      }
      if (params['tags']) {
        this.tags = params['tags'];
      }
    });
    this.userType = localStorage.getItem('user_type')
    this.filteredPosts = this.blogPosts;  // Initialize with all posts
    this.getBlogList()

  }



  generateFakeSkeleton(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }


  public skeletonLoader: boolean = false;
  public loading: boolean = false


  handleBlog(blogType: any, blogData: any, index: any) {
    console.log('handleBlog')
    if (blogType === 'createBlog') {
      const dialogRef = this.dialog.open(PopupComponent, {
        disableClose: true,
        backdropClass: 'bp_custom_popup',
        width: '460px',
        data: { openPop: blogType },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result.event == 'ok') {
          this.getBlogList()
        }
      });
    }
    if (blogType === 'editBlog') {
      console.log(blogData,'---blogData')
      const dialogRef = this.dialog.open(PopupComponent, {
        disableClose: true,
        // backdropClass: AppSettings.backdropClass,
        backdropClass: 'bp_custom_popup',
        width: '460px',
        data: {
          openPop: blogType,
          title: blogData.title,
          content: blogData.content,
          id: blogData._id,
          tags:blogData.tags
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result.event,'(result.event ' )

        if (result.event == 'ok') {
          this.getBlogList()
        } else if (result.event == 'fail') {
          this.selectedDropdown = null
        }
      });
    }
    if (blogType === 'deleteBlog') {
      const dialogRef = this.dialog.open(PopupComponent, {
        disableClose: true,
        // backdropClass: AppSettings.backdropClass,
        backdropClass: 'bp_custom_popup',
        width: '460px',
        data: {
          openPop: blogType,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result.event == 'ok') {
          this.removeBlog(index, blogData._id);
        }
        else if (result.event == 'fail') {
          this.selectedDropdown = null
        }
        else {
          this.loading = false;
        }
      });
    } 
    if(blogType === 'viewBlog') {
      this.updateViewCount(blogData._id)
      window.location.assign(`/blog/detail/${blogData._id}`)
    }

  }

  updateViewCount(blogId:any) {
      this.loading = true;
      let APIparams
        APIparams = {
          apiKey: AppSettings.APIsNameArray.BLOG.read + '/' + blogId,
          uri: '',
        };
        console.log(APIparams,'---APIparams')
        this.commonService.put(APIparams).subscribe(
          (success) => {
            if(success.success == true){
            }
          console.log(success,'success')
          this.loading = false;

          },
          (error) => {
            this.loading = false;
          }
        );
      }


  removeBlog(index, blogId) {
    this.loading = true;
    let uri = null;
   
    let APIparams = {
      apiKey: AppSettings.APIsNameArray.BLOG.blogs + '/' + blogId,
      uri: uri,
    };
    this.commonService.delete(APIparams).subscribe(
      (success) => {
        if (success.success === true) {
          this.loading = false;
          this.blogList?.splice(index, 1);
          this.alertService.showNotificationMessage(
            'success',
            'bottom',
            'left',
            'txt_s',
            'check_circle',
            'Remove Blog',
            'You have successfully removed blog.'
          );

        } else if (success.success === false) {
          this.alertService.showNotificationMessage(
            'danger',
            'bottom',
            'left',
            'txt_d',
            'cancel',
            'Remove Blog',
            'There is some issue, Please try again'
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

  clearSearch() {
    this.title = '';  // Or null if needed
    this.tags = '';  // Or null if needed
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { title: null, tags: null },  // Remove 'search' from URL
      queryParamsHandling: 'merge'  // Keep other query params, if any
    });
    this.getBlogList()
  }

  onSearch() {
    // Update the URL with the search term as a query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...(this.title ? { title: this.title } : {}),
        ...(this.tags ? { tags: this.tags } : {})
      },  // Adds 'title' and 'tags' to URL if they exist
      queryParamsHandling: 'merge'  // Keep other existing query params in the URL
    });
    this.getBlogList()
  }
  

  getBlogList() {
    this.page=1;
    this.skeletonLoader = true;
    let uri = null;
    let newParams:any = {
      limit: '6',
      page: '1',
    };
    if (this.title.trim()) {
      newParams.title = this.title;
    }

    if (this.tags) {
      newParams.tags = this.tags
    }
    if (newParams) uri = this.commonService.getAPIUriFromParams(newParams);
    let APIparams = {
      apiKey: AppSettings.APIsNameArray.BLOG.blogs,
      uri: uri,
    };
    this.commonService.getList(APIparams).subscribe((ServerRes) => {
      if (ServerRes.success === true) {
        console.log(ServerRes,'---ServerRes')
        this.blogList = ServerRes.response.allBlogs;
        this.totalPage = ServerRes.response?.totalPages;
        this.totalRecords = ServerRes.response?.totalBlogs;

        this.skeletonLoader = false;
      } else {
        this.blogList = [];
        this.skeletonLoader = false;
      }
    }, (error) => {
      this.blogList = [];
      this.skeletonLoader = false;
    });
  }

  toggle(index: number,blogData:any): void {
    this.updateViewCount(blogData._id)
    window.location.assign(`/blog/detail/${blogData._id}`)
    // this.isExpanded[index] = !this.isExpanded[index];
  }

  getAPIParam() {
    let APIparams, params;
    params = { limit: 6, page: this.page, };
    let url;
    url = AppSettings.APIsNameArray.BLOG.blogs;
    APIparams = {
      apiKey: url,
      uri: this.commonService.getAPIUriFromParams(params),
    };
    return APIparams;
  }
  getMoreData() {
    var APIparams = this.getAPIParam();
    this.commonService.getList(APIparams).subscribe((ServerRes) => {
      let result = ServerRes.response.allBlogs;
      this.spinnerLoader = false;
      if (
        ServerRes.response.allBlogs &&
        ServerRes.response.allBlogs.length > 0
      ) {
        for (let v = 0; v < result.length; v++) {
          if (result[v]) this.blogList.push(result[v]);
        }
      }
    });
  }

}
