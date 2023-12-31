import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { book } from '../book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ang15-matcard-search-sort-page-demo';
  sortOrderControl = new FormControl('');
  searchKey = new FormControl('');
  books: book[] = [];
  totalRecords: number = 0;
  pageIndex = 0;
  pageSize = 5;
  constructor(private AuthenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.getApi('', '', '',
    this.pageIndex,
    this.pageSize);
    this.sortOrderControl.valueChanges.subscribe((value) => {
      if (value) {
        let sortResult = this.doSorting(value);
        this.pageIndex = 0;
        this.pageSize = 5;
        this.getApi(sortResult.sortColumn, sortResult.sortType, '',
        this.pageIndex,
        this.pageSize);
      }
    });
  }

  doSorting(value: string) {
    let sortColumn: string = '';
    let sortType: string = '';
    if (value.toLowerCase() === 'id-by-desc') {
      sortColumn = 'id';
      sortType = 'desc';
    } else if (value.toLowerCase() === 'id-by-asc') {
      sortColumn = 'id';
      sortType = 'asc';
    } 
    return {
      sortColumn,
      sortType,
    };
  }

  searchByName() {
    let sortResult = this.doSorting(this.sortOrderControl.value ?? '');
    this.pageIndex = 0;
    this.pageSize = 5;
    this.getApi(
      sortResult.sortColumn,
      sortResult.sortType,
      this.searchKey.value ?? '',
      this.pageIndex,
      this.pageSize
    );
  }

  getApi(sortColumn: string, sortType: string, searchKey: string,
    currentPage:number, pageSize:number) {
    this.AuthenticationService
      .getList(sortColumn, sortType, searchKey,(currentPage + 1), pageSize)
      .subscribe((response) => {
        this.books = response.body as book[];
        this.totalRecords = response.headers.get('X-Total-Count')
          ? Number(response.headers.get('X-Total-Count'))
          : 0;
          console.log(this.totalRecords);
      });
  }

  handlePageEvent(e: PageEvent) {
    
    this.pageIndex = e.pageIndex ;
    this.pageSize = e.pageSize;
    let sortResult = this.doSorting(this.sortOrderControl.value ?? '');
    this.getApi(
      sortResult.sortColumn,
      sortResult.sortType,
      this.searchKey.value ?? '',
      this.pageIndex,
      this.pageSize
    );
  }
}
