import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';
import { AppService } from '../../../app.service';

import { Member } from 'src/app/models/Member.model';
import { EMPTY, of } from 'rxjs';
import { MembersModule } from '../../members.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [MembersModule, FormsModule, HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AppService]
    })
    .compileComponents();

    service = TestBed.get(AppService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    component.members = [
      {
        id: 1,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Driver',
        status: 'Active',
        team: 'Ferrari'
      },
      {
        id: 2,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Analyst',
        status: 'Active',
        team: 'Ferrari'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a member', () => {
    let spy = spyOn(service, "deleteMember").and.returnValue(
      EMPTY
    );

    const buttonDelete = fixture.debugElement.query(By.css('#delete_1')).nativeElement;
    buttonDelete.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should go to update a member', inject([Router], (mockRouter: Router) => {

    const spy = spyOn(mockRouter, 'navigate').and.stub();

    const id = '1';

    component.updateMember(id);

    expect(spy.calls.first().args[0]).toEqual(['members/update', id]);

  }));

  it("should fetch data", () => {

    const memberList: Member[] = [
      {
        id: 1,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Driver',
        status: 'Active',
        team: 'Ferrari'
      },
      {
        id: 2,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Analyst',
        status: 'Active',
        team: 'Ferrari'
      },
      {
        id: 3,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Driver',
        status: 'Active',
        team: 'Ferrari'
      },
      {
        id: 4,
        firstName: 'Wilfredo',
        lastName: 'Guardado',
        jobTitle: 'Analyst',
        status: 'Active',
        team: 'Ferrari'
      }
    ];

    spyOn(service, "getMembers").and.returnValue(
      of(memberList)
    );

    component.getMembers();

    expect(component.members.length).toBeGreaterThanOrEqual(4);
  });
});
