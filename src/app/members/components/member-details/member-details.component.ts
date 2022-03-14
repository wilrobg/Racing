import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Member } from 'src/app/models/Member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  constructor(
    private appService: AppService,
    private route: ActivatedRoute) { }

  member!: Member;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      const id = params['id'];
      this.fetchMember(id);
    })
  } 

  fetchMember(id: string) {
    this.appService.getMemberById(id)
    .subscribe(response =>{
      console.log(response);
      this.member = response;
    })
  }
}
