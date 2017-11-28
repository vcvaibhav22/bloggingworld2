import { Injectable } from '@angular/core';
import { Blog } from '../adminShared/blog';
import { Http,Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class BlogAdminService {

  serverUrl = "http://localhost:3002";

  constructor(private http:Http) {

  }


  headers = new Headers({
    'Content-Type': 'application/json',
  });

  createPost(post:Blog): Observable<Blog>{

    let url = this.serverUrl + "/posts";

    return this.http.post(url,post,{headers: this.headers}).map(res => res.json()).catch(err =>{
      return Observable.throw(err);
    })
  }

  editPost(blog: Blog): Observable<any> {
    let url = this.serverUrl + "/posts/" + blog.id;
    return this.http.patch(url,blog,{headers : this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    })

  }


  removePost(deletePost: Blog): Observable<any>{
    let url = this.serverUrl + "/posts/"+ deletePost.id;
    return this.http.delete(url,{headers:this.headers}).map(res => {res.json()},
    ).catch(err => {
      return Observable.throw(err);
    })

  }

  getPostById(id){
    let url = this.serverUrl + "/posts/" + id;

    return this.http.get(url).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }



}
