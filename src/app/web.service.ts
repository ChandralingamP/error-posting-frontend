import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebService {
  readonly ROOT_URI;
  constructor(private http: HttpClient) {
    this.ROOT_URI = 'https://errorbackend-1-w2618457.deta.app'
    // this.ROOT_URI = 'http://localhost:5005'
  }
  get(uri : string){
    return this.http.get(`${this.ROOT_URI}/${uri}`);
  }
  post(uri: string, payload :Object){
    console.log(uri);
    return this.http.post(`${this.ROOT_URI}/${uri}`,payload);
  }
  patch(uri: string,payload :Object){
    return this.http.patch(`${this.ROOT_URI}/${uri}`,payload);
  }
  delete(uri: string){
    return this.http.delete(`${this.ROOT_URI}/${uri}`);
  }
}
