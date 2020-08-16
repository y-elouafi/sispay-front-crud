import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';


import { CreateComponent } from './create.component';
import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';

export const mockUser: any = {
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
};

fdescribe('CreateComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: CreateComponent;
  let api: ApiProvider;
  let user: User = mockUser;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
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
    fixture = TestBed.createComponent(CreateComponent);

    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    api = fixture.debugElement.injector.get(ApiProvider);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create service ApiProvider', () => {
    expect(api).toBeTruthy();
  });

  it('api should provide data', () => {
    api.createUser(user).subscribe((res: User) => {
      expect(res).not.toBe(null);
      expect(JSON.stringify(res)).toEqual(JSON.stringify(mockUser));
    });
    const req = httpTestingController
              .expectOne(api.baseUrl+'/users');
    req.flush(mockUser);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
  });

  it('should test isInvalide', () => {
    // spyOn(component, 'isInvalid').withArgs('prenom').and.callFake(function(){return true;});
    // component.isInvalid('prenom');
    // expect(component.isInvalid).toBeTrue();
  });


});
