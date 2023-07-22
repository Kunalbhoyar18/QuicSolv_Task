import { Component , OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  constructor(private service:ApiserviceService) {}


  errormsg:any;

    ngOnInit():void{}

   

    userForm = new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'contactnumber': new FormControl(''),
      'address': new FormControl('')
    });

    userSubmit(){
      if(this.userForm.valid) {
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res) =>{
          console.log(res,"res==>");
        })
      }else{
       this.errormsg = "all fields required";
      }
    }
  }
