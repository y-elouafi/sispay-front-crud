import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../../../shared/providers/api';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user: User;

  constructor(
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
    this.api.getUser(id).subscribe((res: any)=>{
      this.user = res;
    }, (err)=>{});
  }
}
