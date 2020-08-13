import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DefaultComponent } from './component/default/default.component';
import { CreateComponent } from './component/create/create.component';
import { UpdateComponent } from './component/update/update.component';
import { DetailComponent } from './component/detail/detail.component';


@NgModule({
  declarations: [DefaultComponent, CreateComponent, UpdateComponent, DetailComponent],
  imports: [
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class UserModule { }
