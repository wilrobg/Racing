import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from '../app.service';

import { AuthGuard } from './auth.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/admin', '/crisis-center', '/a/deep/route'];
  let service: AppService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppService]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.get(AppService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate if username is set', () => {

    service.username = 'admin';
    let router = {
      url: 'url'
    } as RouterStateSnapshot;
    const canActivate = guard.canActivate(dummyRoute, router);

    expect(canActivate).toBeTruthy();
  });
});
