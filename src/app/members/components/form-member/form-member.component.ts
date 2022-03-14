import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Team } from 'src/app/models/Team.model';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-details',
  templateUrl: './form-member.component.html',
  styleUrls: ['./form-member.component.css']
})
export class FormMemberComponent implements OnInit {

  teams!: Team[];
  membersForm!: FormGroup;
  private id: any;

  constructor(
    private appService: AppService, 
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) { 
    }

    get firstName() { return this.membersForm.get('firstName'); }
    get lastName() { return this.membersForm.get('lastName'); }
    get jobTitle() { return this.membersForm.get('jobTitle'); }
    get team() { return this.membersForm.get('team'); }
    get status() { return this.membersForm.get('status'); }

  ngOnInit(): void {
    this.getTeams();

    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];

      this.membersForm = this.fb.group({
        firstName: this.fb.control(null, {  validators: [Validators.required] }),
        lastName: this.fb.control(null, { validators: [Validators.required] }),
        jobTitle: this.fb.control(null, { validators: [Validators.required] }),
        team: this.fb.control('', { validators: [Validators.required] }),
        status: this.fb.control('Active', { validators: [Validators.required] })
      });

      this.fetchMember();
    });

    this.membersForm = this.fb.group({
      firstName: this.fb.control(null, {  validators: [Validators.required] }),
      lastName: this.fb.control(null, { validators: [Validators.required] }),
      jobTitle: this.fb.control(null, { validators: [Validators.required] }),
      team: this.fb.control('', { validators: [Validators.required] }),
      status: this.fb.control('Active', { validators: [Validators.required] })
    });
  } 

  onSubmit(){
    if(!this.membersForm.valid) {
      this.validateFields();
      return;
    }
    console.log(this.membersForm);
    let formClone = Object.assign({}, this.membersForm.getRawValue());
    formClone.team = formClone.team.teamName;
    
    if(this.id === undefined){
      this.appService.addMember(formClone).subscribe(response => {
      });
    }
    else{
      this.appService.updateMember(this.id, formClone).subscribe(response => {
      });
    }

    this.router.navigate(['members']);

  }

  validateFields() {
    this.firstName?.markAsDirty();
    this.lastName?.markAsDirty();
    this.jobTitle?.markAsDirty();
    this.team?.markAsDirty();
    this.status?.markAsDirty();
  }

  getTeams(){
    this.appService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams
      console.log(teams);
    });
  }

  fetchMember() {
    this.appService.getMemberById(this.id)
    .subscribe(response =>{
      this.membersForm.patchValue(response);
      let team = this.teams.find(team => team.teamName == response.team);
      this.membersForm.patchValue({ team: team});
    });
  }
  
}
