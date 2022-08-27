import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiServiceService } from './services/api-service.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material-crud';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'comment', 'date',];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog: MatDialog, private getApi: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
  getAllProducts() {
    this.getApi.getProduct().subscribe((result) => {
      // console.table(result);
      // console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
    error: () => {
      alert("Error! While fetching the records");
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
