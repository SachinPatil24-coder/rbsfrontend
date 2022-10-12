import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { BookedDetails } from './BookedDetails';
import { roomType } from './room/roomType';

@Injectable({
  providedIn: 'root'
})
export class RoomerviceService {
private url:string='';
private status:string='';
  constructor(private http:HttpClient) {
    this.url="http://localhost:8087";
   }
   public findAllRoomType():Observable<roomType[]>
   {
     return this.http.get<roomType []>(this.url+"/allRoomType");
   }
   public bookRooms(objRoom:BookedDetails)
   {
    return this.http.post<BookedDetails>(this.url+"/addBookDetails",objRoom);
   }
}
