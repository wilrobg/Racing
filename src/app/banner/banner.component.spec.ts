import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let service: AppService;
  const username = 'admin';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [AppModule],
      providers:[AppService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(AppService);
    service.username = username;

    fixture.detectChanges();
  });

  it('welcome user', () => {
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container-fluid').textContent).toContain(`Welcome ${service.username}`);

    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();
    expect(service.username).toEqual('');
  });
});
