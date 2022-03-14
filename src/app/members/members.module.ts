import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';

import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersComponent } from './components/members/members.component';
import { FormMemberComponent } from './components/form-member/form-member.component';

@NgModule({
  declarations: [
    MemberDetailsComponent,
    MembersComponent,
    FormMemberComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
