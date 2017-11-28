import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../admin/adminShared/user.service';
import { Blog } from '../admin/adminShared/blog';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  blogPosts: Blog[];
  blogPosts2: Blog[]=[];
  menuChoice: string = "default";
 postCategory:string = "Categories";


  constructor(private userSVC: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){

    this.userSVC.getPosts().subscribe(res =>{
      this.blogPosts = res as Blog[];

    },err =>{

      console.log(err);
    })
  }

  chooseMode(mode: string){
    this.menuChoice = mode;
  }


  choosePost(post: Blog) {
    this.router.navigate(['/post', post.id]);
  }

  getPostsByTitle(titl: string)
  {

    this.userSVC.getPostsTitle(titl).subscribe(res =>{
      this.blogPosts2 = res as Blog[];
    },err =>{
      console.log(err);
    })

  }
}
