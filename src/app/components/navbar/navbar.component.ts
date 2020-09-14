import { User } from './../../shared/services/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User
  private subs = new Subscription()

  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.subscribeToCurrentUser()
  }

  subscribeToCurrentUser() {
    this.subs.add // creates a new subscription
    this.userService.currentUser.subscribe(user => { //creates subscription to our curernt user
      if (user) { // checks to see if the logged in user exists
        this.currentUser = user
      } else { // if the current user doesn't exist
        this.currentUser = null // we set the current user as null
      }
    })
  }

  logoutUser () {
    this.userService.logoutUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
