import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFG : FormGroup
  isConnected : boolean

  constructor(
    private _authService : AuthService,
    private _builder : FormBuilder
  ) { }

  ngOnInit(): void {
    this._authService.connectedSubject.subscribe({
      next : (data : boolean) => this.isConnected = data
    })

    this.loginFG = this._builder.group({
      email : [null, Validators.required],
      password : [null, Validators.required],
    })
  }

  onSubmit() {
    this._authService.login(this.loginFG.value['email'], this.loginFG.value['password'])
  }

  logout() {
    this._authService.logout()
  }

}
