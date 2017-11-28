import { Component, OnInit } from '@angular/core';
import {UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';
import {isNullOrUndefined} from "util";

@Component({
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
  theUser: string;
  menuChoice: string;
  blogPosts: Blog[];
  formDisplay: boolean = true;
  singlePost: Blog;

  constructor(
    private userSVC: UserService,
    private router: Router,
    private blogAdminSVC: BlogAdminService
  ){}

  logout(){
    this.userSVC.logout();
    this.router.navigate(['']);
  }

  chooseMode(mode: string){
    this.menuChoice = mode;
  }

  ngOnInit(){
    this.theUser = this.userSVC.loggedInUser;
    this.getPostsById(this.userSVC.authUser);
  }


  getPostsById(UserId: number){

    this.userSVC.getPostsById(UserId).subscribe(res =>{

      this.blogPosts = res as Blog[];

    },err =>{

      console.log(err);
    })
  }


  editPost(thePost: Blog){
    this.singlePost = thePost;
    this.formDisplay = false;
  }


  cancelEdit(){
    this.formDisplay = true;
  }

 updatePost(single: Blog) {

    if(isNullOrUndefined(single.title)||isNullOrUndefined(single.content)){
      alert("Fields Cannot be empty");
    }
    else if(!single.title.trim()||!single.content.trim()){
      alert("Fields Cannot be empty");
    }


    else{
      this.blogAdminSVC.editPost(single).subscribe(res => {

        this.formDisplay = true;

      }, err => {
        console.log(err);

      })
    }

  }


  deletePost(single: Blog){
    let verify = confirm(`Are you sure you want to delete this post?`);
    if (verify == true) {
      this.blogAdminSVC.removePost(single).subscribe(res => {
        this.router.navigate(['/admin/']);
        }, err => {
        console.log(err);

      });
    } else {
      alert('Nothing deleted!');
    }
  }


}
