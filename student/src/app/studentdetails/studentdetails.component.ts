import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})
export class StudentdetailsComponent implements OnInit {
  studentdetailsForm = this.fb.group({
    student_name: ['',[Validators.required]],
     dob: ['',[Validators.required]],
     course_id: [null,[Validators.required]],
     mobile_no: ['',[Validators.pattern("[6789][0-9]{9}"), Validators.required,Validators.maxLength(10)]]
    
  });
  course: any;
  data: any;
  constructor(private fb: FormBuilder,private ds:DataService,private datePipe: DatePipe) { }
 
  ngOnInit(): void {
    this.getCourse();
  }

 

  getCourse() {
    this.ds.getData('courses/getCourses').subscribe(res => {
      this.course = res;
      console.log(this.course);

    });
  }
  onSubmit() {


    this.studentdetailsForm.patchValue
     ({     
                dob : this.datePipe.transform(this.studentdetailsForm.get("dob")?.value, "yyyy-MM-dd"), 
      });

      console.log();
      
    this.ds.postData('studentdetails', this.studentdetailsForm.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Saved Succesfully');
    });
  }

}
