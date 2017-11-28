import { Component,OnInit } from '@angular/core';
import {UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import { Blog} from "../adminShared/blog";


@Component({
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit{
  public theUser: string;
  blogPosts: Blog[];
  blogPosts2: Blog[]=[];
  singlePost: Blog;
  menuChoice: string = "home";
  postCategory:string = "Categories";
  singlePostChosen:boolean = false;


  constructor( private userSVC: UserService, private router: Router ){}

  ngOnInit(){
    this.theUser = this.userSVC.loggedInUser;
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
    this.singlePostChosen = false;
  }


  choosePost(post: Blog) {
    debugger;
    this.singlePost = post;
    this.singlePostChosen = true;
    this.menuChoice ='';
  }

  getPostsByTitle(titl: string)
  {

    this.userSVC.getPostsTitle(titl).subscribe(res =>{

      this.blogPosts2 = res as Blog[];

    },err =>{

      console.log(err);
    })

  }




  logout(){
    this.userSVC.logout();
    this.router.navigate(['']);
  }

  showAllBlogs(){
    this.userSVC.getPosts().subscribe(res =>{

      this.blogPosts = res as Blog[];

    },err =>{

      console.log(err);
    })
  }
}
