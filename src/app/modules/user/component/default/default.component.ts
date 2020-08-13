import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ApiProvider } from '../../../../shared/providers/api';
import {User} from '../../../../models/user'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  constructor(
    private readonly fb: FormBuilder, 
    public readonly api: ApiProvider, 
    public readonly router: Router
  ) { }

  ngOnInit(){
    this.form = this.initForm();
    this.initUsers();
  }

  initForm(): FormGroup {
    return this.fb.group({
      prenom: ["", null],
      nom: ["", null],
    });
  }

  initUsers(){
    this.api.getUsers().subscribe((res : any)=>{
      this.users = res;
    }, (err)=>{});
  }

  getUsersByCriteria(){
    const criteria = this.form.value;
    if ((criteria?.prenom === null || criteria?.prenom.length === 0) 
            && (criteria?.nom === null || criteria?.nom.length === 0)) 
    {
      this.initUsers(); 
    }
    else{
      this.api.getUsersByCriteria(criteria).subscribe((res : any)=>{
        this.users = res['content'];
      }, (err)=>{});
    }
  }

  deleteUser(id: any){
    if(confirm("Cet Utilisateur sera supprimer difinitivement!")){
      this.api.deleteUser(id).subscribe(()=>{
        this.initUsers();
      }, ()=>{});

    }
  }
}
