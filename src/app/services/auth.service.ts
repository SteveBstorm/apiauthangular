import { ConnectedUser } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isConnected : boolean

  get isConnected() : boolean {
    return localStorage.getItem('token') != null ? true : false
  }

  connectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitSubject() {
    this.connectedSubject.next(this.isConnected)
  }

  private baseAdress : string = "http://localhost:53448/api/"

  constructor(
    private _client : HttpClient
  ) { }

  login(email : string, password :string) {
    this._client.post<ConnectedUser>(this.baseAdress+"auth/auth", {email : email, password : password}).subscribe({
      next : (data : ConnectedUser) => {
        console.log(data)
        localStorage.setItem('token', data.token)
        this.emitSubject()
      }
    })
  }

  logout() {
    localStorage.clear()
    this.emitSubject()
  }
}


