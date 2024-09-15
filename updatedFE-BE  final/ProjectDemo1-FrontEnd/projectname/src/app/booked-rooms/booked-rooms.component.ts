import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrl: './booked-rooms.component.css'
})
export class BookedRoomsComponent implements OnInit {
  bookedRooms: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5046/api/Payment/GetBookedRoomsimage').subscribe({
      next: (data) => {
        // Add isCanceled property to each room object
        this.bookedRooms = data.map(room => ({ ...room, isCanceled: false }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load booked rooms';
        this.loading = false;
      }
    });
  }

  // Method to handle cancel button click
  cancelRoom(room: any) {
    room.isCanceled = true; // Set isCanceled to true when the cancel button is clicked
  }
}