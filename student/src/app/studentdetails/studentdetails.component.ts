import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['student_id', 'student_name', 'dob','course_name', 'mobile_no'];
  dataSource!: MatTableDataSource<any> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  studentdetails: any;

  constructor(private fb: FormBuilder,private ds:DataService,private datePipe: DatePipe) { }
 
  ngOnInit(): void {
    this.getCourse();
    this.getStudentDetails();
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
    this.getStudentDetails();
  }
   onClear(){
    this.studentdetailsForm.reset();
   }


   getStudentDetails()
   {
    
     this.ds.getData('studentdetails/getStudentDetails').subscribe((res:any) => 
     {     
      this.studentdetails = res;
       this.dataSource = new MatTableDataSource(this.studentdetails);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   }
 
   applyFilter(event: Event) 
   {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
 
 }
 


