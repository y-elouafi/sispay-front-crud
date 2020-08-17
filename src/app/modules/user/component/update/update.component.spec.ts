import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';
import { UpdateComponent } from './update.component';


export const mockUser: any = {
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
};


fdescribe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let httpTestingController: HttpTestingController;
  let api: ApiProvider;
  let user: User = mockUser;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
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
    fixture = TestBed.createComponent(UpdateComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
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

  // it('component should update user onSubmit', () => {
  //   component.onSubmit();
  //   const req = httpTestingController.expectOne(api.baseUrl+'/users/update');
  //   expect(req.request.method).toBe('PUT');
  // });

  // it('api should provide data', () => {
  //   api.updateUser(user).subscribe((res: User) => {
  //     expect(res).not.toBe(null);
  //     expect(JSON.stringify(res)).toEqual(JSON.stringify(mockUser));
  //   });
  //   const req = httpTestingController.expectOne(api.baseUrl+'/users/update');
  //   req.flush(mockUser);
  //   expect(req.request.method).toBe('PUT');
  //   expect(req.request.body).toEqual(user);
  // });

});
