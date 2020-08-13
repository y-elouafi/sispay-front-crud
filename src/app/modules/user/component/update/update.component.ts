import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiProvider } from '../../../../shared/providers/api';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private readonly fb: FormBuilder, 
    public readonly api: ApiProvider,
    private readonly route: ActivatedRoute, 
    public readonly router: Router) 
  { }

  ngOnInit() {
    this.getId();
  }

  getId(): void {
    this.route.paramMap.subscribe(params => {
      this.getUserById(params.get("id"));
    });
  }
  getUserById(id: any){
    console.log("log id: " + id);
    this.api.getUser(id).subscribe((res: any)=>{
      this.user = res;
      this.form = this.initForm();
    }, (err)=>{});
  }

  initForm(): FormGroup {
    return this.fb.group({
      prenom: [this.user.prenom, Validators.required],
      nom: [this.user.nom, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern('^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9-]+[\.]{1}[\.a-zA-Z0-9-]+$')]],
      telephone: [this.user.telephone, [Validators.required, Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g')]],
    });
  }

  onSubmit(){
    this.user.prenom = this.form.get('prenom').value;
    this.user.nom = this.form.get('nom').value;
    this.user.email = this.form.get('email').value;
    this.user.telephone = this.form.get('telephone').value;
    this.api.updateUser(this.user).subscribe((res:any) => {
        alert("L'utilisateur " + res.prenom + " a ete modifier avec success!");
        this.router.navigate(['/']);
    }, (err) => {
      alert("Un probleme durant la modification est servenu");
    })
  }

  isInvalid(field: string): boolean {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }
}
