import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';
import {UserService} from "../adminShared/user.service";
import { DatePipe} from "@angular/common";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'add-menu',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent {

  today = Date.now();
  userId:number;
  postTitle: string;
  content: string;
  postCategory:string;
  postDate: number = this.today;
  postTime:number = this.today;
  postUser:string;
  post: Blog;




  constructor( private blogAdminSVC: BlogAdminService, private router: Router,private userSVC: UserService){}


  createPost(){

    if(isNullOrUndefined(this.content)||isNullOrUndefined(this.postTitle)||isNullOrUndefined(this.postCategory)){
      alert("Fields cannot be empty.");
    }

    else if(!this.content.trim()||!this.postTitle.trim()||!this.postCategory.trim()){
      alert("Fields cannot be empty.");
    }

    else {


      this.post = new Blog(
        this.postTitle,
        this.content,
        this.userId = this.userSVC.authUser,
        this.postCategory,
        this.postDate,
        this.postTime,
        this.postUser = this.userSVC.authUserUsername
      );

      this.blogAdminSVC.createPost(this.post).subscribe(res => {

      });

      alert(`${this.postTitle} added to posts`);
      this.router.navigate(['/admin']);
    }
  }

  cancel(){
    this.router.navigate(['/admin']);
  }

}
