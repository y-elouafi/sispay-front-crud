import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';
import { DetailComponent } from './detail.component';


export const mockDog: any = {
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
};


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let httpTestingController: HttpTestingController;
  let api: ApiProvider;
  let user: User = mockDog;


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



});
