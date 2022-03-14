import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
    private appService: AppService,
    private fb: FormBuilder) { }

  private username: string = 'admin';
  private password: string = 'password';
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(null, {  validators: [Validators.required] }),
      password: this.fb.control(null, { validators: [Validators.required] })
    });
  }

  login() {

    let formClone = Object.assign({}, this.loginForm.getRawValue());

    if(formClone.username === this.username && formClone.password === this.password){
      this.appService.setUsername(formClone.username);
      this.router.navigate(['/members']);
    }
  }

}
