import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import {
  ContainerComponent,
  INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { AuthService } from '../../../services/auth.service';


function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent implements OnInit {

  isLogged = false;
  userRole : string | null = '';
  public navItems : INavData[] = [];

  constructor(private authServ:AuthService, private router: Router) {
    this.authServ.isLoggedIn$.subscribe((res) => {
      this.isLogged = res
    })
  }
  ngOnInit() {
  this.authServ.userRole$.subscribe((res) => {
    this.userRole = res
  })

  if (this.userRole == 'Supplier') {
    this.navItems.push(
      // add here what you want supplier to see
    
    {
      title: true,
      name: 'Account',
    },
    {
      name: 'Logout',
      iconComponent: { name: 'cilAccountLogout' },
      url: '/logout',
    },
    
  )
  }
  else if (this.userRole == 'Admin') {
    this.navItems.push(
       // add here what you want supplier to see
       
    // users 
    {
      name: 'Users',
      url: '/users',
      iconComponent: { name: 'cil-people' },
      children: [
        {
          name: 'Manage Users',
          url: '/Users/manage',
          icon: 'nav-icon-bullet',
        },
      ],
    },
    /// end users

     // users 
     {
      name: 'Products',
      url: '/prodcut',
      iconComponent: { name: 'cil-people' },
      children: [
        {
          name: 'Manage Products',
          url: '/product/manage-products',
          icon: 'nav-icon-bullet',
        },
      ],
    },
    /// end users

 
      {
        title: true,
        name: 'Account',
      },
    
      {
        name: 'Logout',
        iconComponent: { name: 'cilAccountLogout' },
        url: '/logout',
      },
    
    );
  }
  }
  
}
