import {Component, OnInit} from '@angular/core';
import {UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import { User} from "../adminShared/user";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  email: string;
  password1: string;
  user:User []= [];
  loginSuccess:boolean = false;

  constructor(private userSVC: UserService, private router: Router){}

  ngOnInit(){

    this.userSVC.getUsers().subscribe(res => {
      this.user = res as User[];
    }, err => {
      console.log(err);
      alert(`${err.message} Unable to login. Try again!`);
    });
  }

  login(){
    for(let use of this.user){
       if(this.email===use.email&&this.password1===use.password)
       {  this.loginSuccess = true;

         this.userSVC.verifyUser(use.id,this.email,use.username);
       }
        }
       if(this.loginSuccess ===false) {
         alert("Not a Registered User. Signup Now. ");
         this.router.navigate(['/admin/signup']);
       }
  }

  signup(){
    this.router.navigate(['/admin/signup']);
  }

  cancel(){
    this.router.navigate(['']);
  }

}
