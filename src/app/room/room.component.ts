import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedDetails } from '../BookedDetails';
import { RoomerviceService } from '../roomservice.service';
import { Injectable } from '@angular/core';
import { roomType } from './roomType';
import { roomDetails } from './room.details';
declare var $: (arg0: any) => { (): any; new(): any; modal: { (arg0: string): void; new(): any; }; };
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  myGroup:FormGroup | any;
  room:BookedDetails;
  submitted = false;
  result1:Date;
  maxdate:string;
  mindate:string;
  listOfRoomType:roomType[];
  roomDetails:roomDetails;
  errorMessage: string; 

  @ViewChild('someModal') someModal:ElementRef; 
  @ViewChild('sModal') sModal: ElementRef

  constructor(private roomerviceServiceObj:RoomerviceService,private router:Router, private route:ActivatedRoute) {
    this.room=new BookedDetails;
   }
  

  ngOnInit(): void {
    var todayDate=new Date();
    this.mindate=todayDate.toISOString().slice(0, 10);
    this.result1 = this.addDays(30, todayDate);
    this.maxdate=this.result1.toISOString().slice(0, 10);
    this.getAllRoomType();
    this.myGroup=new FormGroup({
      roomCount:new FormControl('',[Validators.required]),
      checkIn:new FormControl('',[Validators.required]),
      checkOut:new FormControl('',[Validators.required]),
      roomType:new FormControl('',[Validators.required])
      
    });
  
  }
  getAllRoomType() {
    this.roomerviceServiceObj.findAllRoomType().subscribe(res => this.listOfRoomType = res, error => this.errorMessage = <any>error);
  }
   addDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
  
    return date;
  }
  bookRooms()
  {
     this.room.checkIn=this.myGroup.get("checkIn").value;
     this.room.checkOut=this.myGroup.get("checkOut").value;
     this.room.roomCount=this.myGroup.get("roomCount").value;
     this.room.typeId=this.myGroup.get("roomCount").value;
     console.log(this.room.checkIn);
     console.log(this.room.checkOut);
     console.log(this.room.roomCount);
     console.log(this.room.typeId);
   
     this.roomerviceServiceObj.bookRooms(this.room).subscribe(response => {
       console.log(response);
       this.submitted = true;
      
         (       response: roomDetails) => this.roomDetails = response
         console.log("To string method works:: "+roomDetails.toString);
     },
     error => {
      console.log(error);
     });
    
    $(this.someModal.nativeElement).modal('show'); 
   }
  closePopup()
  {
    $(this.someModal.nativeElement).modal('hide'); 
  }
 

}


