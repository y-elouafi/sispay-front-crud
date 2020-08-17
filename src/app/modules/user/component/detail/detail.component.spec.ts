import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';
import { DetailComponent } from './detail.component';


export const mockUser: any = {
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
};


fdescribe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let httpTestingController: HttpTestingController;
  let api: ApiProvider;
  let user: User = mockUser;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule, 
        ReactiveFormsModule],
      providers: [ApiProvider, ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    component.user = user;
    api = fixture.debugElement.injector.get(ApiProvider);
    fixture.detectChanges();
  });

  afterEach(() => {
    // httpTestingController.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create service ApiProvider', () => {
    expect(api).toBeTruthy();
  });

  it('component should get user onSubmit', () => {
    component.getUserById(1);
    const req = httpTestingController.expectOne(api.baseUrl+'/users/1');
    expect(req.request.method).toBe('GET');
  });

  it('api should getUser data', () => {
    api.getUser(1).subscribe((res: User) => {
      expect(res).not.toBe(null);
      expect(JSON.stringify(res)).toEqual(JSON.stringify(mockUser));
    });
    const req = httpTestingController.expectOne(api.baseUrl+'/users/1');
    req.flush(mockUser);
    expect(req.request.method).toBe('GET');
  });


});
