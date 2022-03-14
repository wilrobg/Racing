import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';
import { Member } from 'src/app/models/Member.model';
import { Team } from 'src/app/models/Team.model';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AppService
      ],
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should fetch Members as an Observable', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      const membersList: Member[] = [
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
      appService.getMembers().subscribe((posts: any) => {
        expect(posts.length).toBe(2);
      });

      let req = httpMock.expectOne('http://localhost:8000/api/members');
      expect(req.request.method).toBe("GET");
      req.flush(membersList);
      httpMock.verify();
  })));

  it('should fetch Teams as an Observable', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      const teamsList: Team[] = [
        {
          id: 1,
          teamName: 'Test 1'
        },
        {
          id: 2,
          teamName: 'Test 2'
        }
      ];
      appService.getTeams().subscribe((posts: any) => {
        expect(posts.length).toBe(2);
      });

      let req = httpMock.expectOne('http://localhost:8000/api/teams');
      expect(req.request.method).toBe("GET");
      req.flush(teamsList);
      httpMock.verify();
  })));

  it('should fetch a member by member Id as an Observable', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      const membersList: Member[] = [
        {
          id: 1,
          firstName: 'Wilfredo',
          lastName: 'Guardado',
          jobTitle: 'Driver',
          status: 'Active',
          team: 'Ferrari'
        }
      ];
      appService.getMemberById('1').subscribe((posts: any) => {
        expect(posts.length).toBe(1);
      });

      let req = httpMock.expectOne('http://localhost:8000/api/members/1');
      expect(req.request.method).toBe("GET");
      req.flush(membersList);
      httpMock.verify();
  })));

  it('should add member by POST', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      const member: Member = {
          id: 1,
          firstName: 'Wilfredo',
          lastName: 'Guardado',
          jobTitle: 'Driver',
          status: 'Active',
          team: 'Ferrari'
        };
      appService.addMember(member).subscribe((posts: any) => {
        expect(member.firstName).toBe(posts.firstName);
      });

      let req = httpMock.expectOne('http://localhost:8000/api/addMember');
      expect(req.request.method).toBe("POST");
      req.flush(member);
      httpMock.verify();
  })));

  it('should update member by PUT', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      const member = {
          firstName: 'Wilfredo',
          lastName: 'Guardado',
          jobTitle: 'Driver',
          status: 'Active',
          team: 'Ferrari'
        };
      appService.updateMember(1,member).subscribe((posts: any) => {
        expect(member.firstName).toBe(posts.firstName);
      });

      let req = httpMock.expectOne('http://localhost:8000/api/members/1');
      expect(req.request.method).toBe("PUT");
      req.flush(member);
      httpMock.verify();
  })));

  it('should handle error on Request', (inject([HttpTestingController, AppService],
    (httpClient: HttpTestingController, appService: AppService) => {
      
      const data = 'Invalid request parameters';
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let response: any;
      let errResponse: any;
      
      appService.getMembers()
      .subscribe(res => response = res, err => errResponse = err);

      let req = httpMock.expectOne('http://localhost:8000/api/members');
      expect(req.request.method).toBe("GET");
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(`Backend returned code ${mockErrorResponse.status}, ` + `body was: ${data}`);
  })));
});
