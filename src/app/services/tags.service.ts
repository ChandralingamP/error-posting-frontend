import { Injectable } from '@angular/core';
import { WebService } from '../web.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private service : WebService) {}
  getTags(){
    return this.service.get('tags');
  }
  searchTag(query : string){
    return this.service.get(`tags/search/${query}`);
  }
}
