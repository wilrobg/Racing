import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './components/members/members.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { FormMemberComponent } from './components/form-member/form-member.component';

const routes: Routes = [
  {
    path:'',
    component: MembersComponent
  },
  {
    path:'add',
    component: FormMemberComponent
  },
  {
    path:'update/:id',
    component: FormMemberComponent
  },
  {
    path:':id',
    component: MemberDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
