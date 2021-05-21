import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Friend} from './friend';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddFriendService {
    url = 'http://localhost:6969/addFriend';
    urlDel = 'http://localhost:6969/deleteFriend';
    urlUp = 'http://localhost:6969/updateFriend';

    constructor(private http: HttpClient) {}

    postRequest(friend: Friend): Observable<Friend> {
        return this.http.post( this.url, friend);
    }

    deleteFriend(friend: Friend): Observable<any>{
        return this.http.post(this.urlDel, friend);
    }

    updateFriend(friend: Friend, updatedFriend: Friend): Observable<any>{
        updatedFriend.email = friend.email;
        return this.http.post(this.urlUp, updatedFriend);
    }
}
