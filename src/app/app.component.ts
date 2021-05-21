import { Component } from '@angular/core';
import {Friend} from './friend';
import {AddFriendService} from './add-friend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-angular';
  friendList: Friend[] | undefined;
  friendModel = new Friend();
  codingList = ['Javascript', 'PHP', 'Java', 'Python', 'C++'];

  getAllFriends = 'http://localhost:3500/allFriends';

  addFriend(): void {
    this.addFriendService.postRequest(this.friendModel).subscribe(succes => this.fetchFriends()
            .then(res => console.log(this.friendModel)),
        error => console.error(error));
  }

  public async fetchFriends(): Promise<any> {
    await fetch('http://localhost:3500/allFriends', {method: 'get', headers: {'Content-Type': 'application/json'}})
        .then(response => {
          return response.json() as Promise<any>;
        })
        .then(response => {
          console.log(response)
          return this.friendList = response;
        });
  }



  ngOnInit(): any {
    this.fetchFriends().then(r => console.log(r));
  }

  constructor(
      private addFriendService: AddFriendService,
  ) {
  }

  public async deleteFriend(friend: Friend): Promise<any> {
    this.addFriendService.deleteFriend(friend).subscribe
    (response => this.fetchFriends().then(response => console.log(response)), error => console.error(error));
  }

  public async updateFriend(friend: Friend): Promise<any> {
    this.addFriendService.updateFriend(friend, this.friendModel).subscribe
    (response => this.fetchFriends().then(response => console.log(response)), error => console.error(error));
  }

}
