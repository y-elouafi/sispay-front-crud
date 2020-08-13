import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiProvider } from '../../../../shared/providers/api';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  user: User = new User();

  constructor(
    private readonly fb: FormBuilder, 
    public readonly api: ApiProvider, 
    public readonly router: Router) 
  { }

  ngOnInit() {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      prenom: [null, Validators.required],
      nom: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9-]+[\.]{1}[\.a-zA-Z0-9-]+$')]],
      telephone: [null, [Validators.required, Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g')]],
    });
  }

  onSubmit(){
    this.user.prenom = this.form.get('prenom').value;
    this.user.nom = this.form.get('nom').value;
    this.user.email = this.form.get('email').value;
    this.user.telephone = this.form.get('telephone').value;
    this.api.createUser(this.user).subscribe((res:any) => {
        alert("L'utilisateur " + res.prenom + " a ete ajouter avec success!");
        this.router.navigate(['/']);
    }, (err) => {
      alert("Un probleme durant la creation est servenu");
    })
  }

  isInvalid(field: string): boolean {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }
}
