import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  errors = {
    bookName: null,
    categoryId: null,
    note: null,
  }
  selectedFile: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }


  onSubmit(form: NgForm) {

    var data = new FormData();
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    data.append('image', this.selectedFile);
    data.append('bookName', form.value.bookName);
    data.append('categoryId', form.value.categoryId);
    data.append('note', form.value.note);
    data.append('author_id', userObj.id);

    /* Image Post Request */
    this.http.post('http://localhost:8000/api/save_book', data, {
      headers: headers
    }).subscribe(data => {
      console.log('uplod done');

    });

  }


}
