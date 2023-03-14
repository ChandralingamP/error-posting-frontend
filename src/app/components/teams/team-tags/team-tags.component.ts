import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-tags',
  templateUrl: './team-tags.component.html',
  styleUrls: ['./team-tags.component.css']
})
export class TeamTagsComponent implements OnInit {
  @Input() tag = '';
  teamId : String | undefined
  constructor(
    private router: Router,
    private route : ActivatedRoute
  ) { }
  ngOnInit(){
    this.teamId = this.route.snapshot.paramMap.get('id')!;
  }
  navToTags(tag : string){
    let uri = 'team/question/tag/'+ this.teamId + '/'+tag;
    this.router.navigate([uri]);
  }
}
