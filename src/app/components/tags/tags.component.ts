import { Component, OnInit } from '@angular/core';
import { Tags } from 'src/app/interface/interface.model';
import { TagsService } from 'src/app/services/tags.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  tagQuery : string = ''
  tags: Array<Tags> | undefined
  constructor(private service: TagsService, private router: Router
  ) { }
  navTo(uri: string) {
    this.router.navigate(['/' + uri])
  }
  searchTags(){
    console.log(this.tagQuery);

    if(this.tagQuery == ''){
      this.service.getTags().subscribe((data : any)=> {this.tags = data});
    }else{
      this.service.searchTag(this.tagQuery).subscribe((data : any )=> this.tags = data);
    }
  }
  ngOnInit() {
    this.service.getTags().subscribe((data: any) => this.tags = data);
  }
}
