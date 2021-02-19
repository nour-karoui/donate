import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadAPI: Promise<any>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://donate.com/api/users/current-user')
      .subscribe(message => {
        console.log('hellloooo');
        console.log(message);
      });
  }
}
