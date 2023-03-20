import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm = this.fb.group({
    name: [''],
    
  });
  course: any;
  data: any;


  constructor(private fb: FormBuilder,private ds:DataService) { }

  ngOnInit(): void {
  }

  getCourse() {
    this.ds.getData('courses').subscribe(res => {
      this.course = res;
      console.log(this.course);

    });
  }
  onSubmit() {
    this.ds.postData('courses', this.courseForm.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Saved Succesfully');
    });
  }
}
