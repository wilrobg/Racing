import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

import { Member } from 'src/app/models/Member.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members!: Member[];

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(){
    this.appService.getMembers().subscribe((members: Member[]) => (this.members = members));
  }

  updateMember(id: any){
    this.router.navigate(['members/update', id]);
  }

  deleteMember(id: any){
    this.appService.deleteMember(id).subscribe();
    
    this.getMembers();
  }
}
