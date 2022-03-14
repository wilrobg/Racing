import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Member } from 'src/app/models/Member.model';
import { MembersModule } from '../../members.module';

import { MemberDetailsComponent } from './member-details.component';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let service: AppService;

  const member: Member = { 
    id: 1,
    firstName: 'Wilfredo',
    lastName: 'Guardado',
    jobTitle: 'Driver',
    status: 'Active',
    team: 'Ferrari'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailsComponent ],
      imports: [MembersModule, HttpClientModule, RouterTestingModule],
      providers: [AppService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;

    component.member = member;

    fixture.detectChanges();

    service = TestBed.get(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detail component', () => {

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul').textContent).toContain(`First Name: ${member.firstName}`);
  });

  it('should fetch detail component', () => {
    const localMember: Member = { 
      id: 1,
      firstName: 'Local Wilfredo',
      lastName: 'Guardado',
      jobTitle: 'Driver',
      status: 'Active',
      team: 'Ferrari'
    }

    const spy = spyOn(service, 'getMemberById').and.returnValue(
      of(localMember)
    );

    const compiled = fixture.nativeElement;
    
    component.fetchMember('1');
    fixture.detectChanges();

    expect(compiled.querySelector('ul').textContent).toContain(`First Name: ${localMember.firstName}`);
    expect(spy).toHaveBeenCalled();
  });
});
