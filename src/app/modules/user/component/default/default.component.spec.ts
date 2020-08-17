import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';
import { DefaultComponent } from './default.component';

export const mockUsers: any = [{
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
},
{
  prenom: 'hamza',
  nom: 'nachit',
  email: 'hamza@gmail.com',
  telephone: '083464653'
},
];

export const mockUsersByCriteria: any=[{
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
},];

fdescribe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  let httpTestingController: HttpTestingController;
  let api: ApiProvider;
  let users: User[] = mockUsers;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultComponent ],
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
    fixture = TestBed.createComponent(DefaultComponent);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    api = fixture.debugElement.injector.get(ApiProvider);
    fixture.detectChanges();
  });

  afterEach(() => {
    // httpTestingController.verify();
  });

  it('should create component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should create service ApiProvider', async(() => {
    expect(api).toBeTruthy();
  }));

  it('should component initUsers', () => {
    component.initUsers();
    const req = httpTestingController.match(api.baseUrl+'/users');
    // httpTestingController.verify();
    // tick();
    expect(req[1].request.method).toBe('GET');
  });

  it('should ApiProvider getUsers', () => {
    api.getUsers().subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(JSON.stringify(res)).toEqual(JSON.stringify(mockUsers));
    });
    const req = httpTestingController.match(api.baseUrl+'/users');
    req[1].flush(mockUsers);
    // httpTestingController.verify();
    // tick();
    expect(req[1].request.method).toBe('GET');
  });


  it('should component getUsersByCriteria', () => {
    component.getUsersByCriteria();
    const req = httpTestingController.match(api.baseUrl+'/users');
    // httpTestingController.verify();
    // tick();
    expect(req[1].request.method).toBe('GET');
  });

  it('should ApiProvider getUsersByCriteria', () => {
    api.getUsersByCriteria({prenom: "youssef", nom: "elouafi"}).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(JSON.stringify(res)).toEqual(JSON.stringify(mockUsersByCriteria));
    });
    const req = httpTestingController.expectOne(api.baseUrl+'/users/search?prenom=youssef&nom=elouafi');
    req.flush(mockUsersByCriteria);
    // httpTestingController.verify();
    // tick();
    expect(req.request.method).toBe('GET');
  });

  it('should component deleteUser', () => {
    component.deleteUser(1);
    const req = httpTestingController.expectOne(api.baseUrl+'/users/delete/1');
    // httpTestingController.verify();
    // tick();
    expect(req.request.method).toBe('DELETE');
  });

  it('should ApiProvider deleteUser', () => {
    api.deleteUser(1).subscribe((res: any) => {});
    const req = httpTestingController.expectOne(api.baseUrl+'/users/delete/1');
    // httpTestingController.verify();
    // tick();
    expect(req.request.method).toBe('DELETE');
  });

});
