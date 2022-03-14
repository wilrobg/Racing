import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AppModule],
      providers: [AppService]
    })
    .compileComponents();

    service = TestBed.get(AppService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const form = fixture.debugElement.query(By.css('#loginForm'));
    const username = 'admin';

    component.loginForm.controls.username.setValue(username);
    component.loginForm.controls.password.setValue('password');

    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    expect(username).toEqual(service.username);
  });
});
