import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  submitted = false;
  data: any;
  errorMessage: any;
  studentForm: any;

  studentDetailsForm = this.formBuilder.group({
    id: [{ value: '', disabled: false }],
    phoneNumber: [{ value: '', disabled: false }],
    name: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
  });

  constructor(private router: Router, private userService: UserService,public route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.patchValue();
  }

  // convenience getter for easy access to form fields
  get f() { return this.studentDetailsForm.controls; }

  patchValue() {
    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(atob(params['data']));
      console.log(this.data);

      this.studentDetailsForm.patchValue({
        id: this.data.id,
        phoneNumber: this.data.phoneNumber,
        name: this.data.name,
        gender:this.data.gender,
        email: this.data.email
      });
    });
  }

  updateStudentInfo() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.studentDetailsForm.invalid) {
      return;
    }
    else {
      this.studentForm = this.studentDetailsForm.value;
      let id = this.studentDetailsForm.value.id;

      let obj = {
        id: this.studentForm.id,
        phoneNumber: this.studentForm.phoneNumber,
        name: this.studentForm.name,
        gender:this.studentForm.gender,
        email: this.studentForm.email
      }
      console.log(obj);

      this.userService.updateStudentinfo(id, obj).subscribe(
        (data: any) => {
          console.log(data)
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage)
        });
    }
  }
}
