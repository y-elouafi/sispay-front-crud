import {NO_ERRORS_SCHEMA} from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';

import { ApiProvider } from '../../../../shared/providers/api';
import { User } from '../../../../models/user';
import { DefaultComponent } from './default.component';

export const mockDog: any = {
  prenom: 'youssef',
  nom: 'elouafi',
  email: 'youssef@gmail.com',
  telephone: '0989474654'
};

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  let httpTestingController: HttpTestingController;
  let api: ApiProvider;
  let user: User = mockDog;

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
    httpTestingController.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create service ApiProvider', () => {
    expect(api).toBeTruthy();
  });

});
