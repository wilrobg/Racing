import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MembersModule } from '../../members.module';
import { EMPTY, of } from "rxjs";
import { ReactiveFormsModule } from '@angular/forms';

import { FormMemberComponent } from './form-member.component';
import { AppService } from '../../../app.service';
import { HttpClientModule } from '@angular/common/http';
import { Team } from 'src/app/models/Team.model';
import { Member } from 'src/app/models/Member.model';

describe('FormMemberComponent', () => {
  let component: FormMemberComponent;
  let fixture: ComponentFixture<FormMemberComponent>;
  let service: AppService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMemberComponent],
      imports: [MembersModule, FormsModule, HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AppService]
    })
    .compileComponents();
  });

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(FormMemberComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AppService);

    component.membersForm = fb.group({
      firstName:  ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    });
    fixture.detectChanges();
  }));

  it('should test form validity', () => {
    const form = component.membersForm;
    expect(form.valid).toBeFalsy();

    const firstName = form.controls.firstName;
    firstName.setValue('John Peter');

    expect(firstName.valid).toBeTruthy();
  });

  it('should validate form', () => {
    expect(component).toBeTruthy();
  });

  it('should validate fields before submit', () => {

    const form = fixture.debugElement.query(By.css('#memberForm'));

    component.membersForm.controls.firstName.setValue('');
    component.membersForm.controls.lastName.setValue('');
    component.membersForm.controls.jobTitle.setValue('');
    component.membersForm.controls.team.setValue('');
    component.membersForm.controls.status.setValue('');

    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    expect(component.membersForm.controls.firstName.valid).toBeFalsy();
  });

  it('should save member when form is submitted', () => {

    const spy = spyOn(service, 'addMember').and.returnValue(
      EMPTY
    );

    const form = fixture.debugElement.query(By.css('#memberForm'));

    component.membersForm.controls.firstName.setValue('firstName');
    component.membersForm.controls.lastName.setValue('lastName');
    component.membersForm.controls.jobTitle.setValue('jobTitle');
    component.membersForm.controls.team.setValue('team');
    component.membersForm.controls.status.setValue('status');

    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalled();
  });

  it('should fetch member', () => {
    
    const member: Member = {
      id: 1,
      firstName: 'Wilfredo',
      lastName: 'Guardado',
      jobTitle: 'FE',
      status: 'Active',
      team: 'Trexis'
    }

    const spy = spyOn(service, 'getMemberById').and.returnValue(
      of(member)
    );
    component.fetchMember();

    const form = fixture.debugElement.query(By.css('#memberForm'));
    
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    expect(spy).toHaveBeenCalled();
    expect(component.membersForm.controls.firstName.value).toEqual(member.firstName);
  });

  it('should get Teams', () => {

    const Teams: Team[] =[{
      id: 1,
      teamName: 'Team 1'
    },
    {
      id: 2,
      teamName: 'Team 2'
    }];

    const spy = spyOn(service, 'getTeams').and.returnValue(
      of(Teams)
    );

    component.getTeams();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

});
