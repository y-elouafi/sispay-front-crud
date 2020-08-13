import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiProvider {



  baseUrl = 'http://127.0.0.1:8011/api';

  constructor(
    private readonly http: HttpClient,
  ) { }

  createUser(body: any) {
    return this.http.post(this.baseUrl + '/users', body);
  }

  updateUser(body: any) {
    return this.http.put(this.baseUrl + '/users/update/', body);
  }

  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + '/users/delete/' + id);
  }

  getUser(id: any) {
    return this.http.get(this.baseUrl + '/users/' + id);
  }
  
  getUsers() {
    return this.http.get(this.baseUrl + '/users');
  }

  getUsersByCriteria(criteria: any) {
    return this.http.get(this.baseUrl + '/users/search', {params: criteria});
  }
}