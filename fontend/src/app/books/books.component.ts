import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  errors = {
    bookName:null,
    categoryId:null,
    image:null,
    note:null,
  }
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const book_name = form.value.bookName;
    const category_id = form.value.categoryId;
    const upimage = form.value.image;
    const nnote = form.value.note;

    this.auth.saveBook(book_name,category_id,upimage,nnote).subscribe((res)=>{
       console.log(res);
       // redirect to home
      // this.router.navigate(['']);
    },
    (err)=>{
      this.errors = err.error.errors;
      // console.log(err.error.errors);
    })
  }
  

}
