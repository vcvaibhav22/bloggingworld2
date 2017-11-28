import { Component} from "@angular/core";

@Component({
  selector: 'navi-bar',
  template: `
    <div class="nav">
    <nav class="navbar navbar-expand-lg ">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          
          <li class="nav-item active">
            <a class="nav-link"  [routerLink]="['/admin']" >Login Here<span class="sr-only">(current)</span></a>
          </li>

        </ul>
      </div>
    </nav>
    </div>   
  `,
  styleUrls: ['./navbar.component.css']
})

export class NavComponent{}
