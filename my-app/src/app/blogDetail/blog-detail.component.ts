import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Blog } from '../admin/adminShared/blog';
import 'rxjs/add/operator/switchMap';
import {BlogAdminService} from "../admin/adminShared/blog-admin.service";
import {DatePipe} from "@angular/common";

@Component({
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  providers: [BlogAdminService]
})

export class BlogDetailComponent implements OnInit {

  post:Blog;


  constructor( private route: ActivatedRoute, private router: Router,
               private blogAdminSVC: BlogAdminService ) {}

  ngOnInit(){
    let postId = this.route.snapshot.params['id'];
    this.getSingle(postId);
  }

  getSingle(id:string){
    this.blogAdminSVC.getPostById(id).subscribe(res =>{
      this.post = res as Blog;
    },err =>{
      console.log(err);
    })

  }

  gotoAllBlogs(){
    this.router.navigate(['']);
  }

}
