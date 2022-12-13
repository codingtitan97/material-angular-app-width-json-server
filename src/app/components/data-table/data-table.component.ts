import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormComponent } from '../mat-form/mat-form.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('error while fetching records');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.getAllProduct();
      },
      error: () => {
        alert('Error while deleting data!');
      },
    });
  }
  editProduct(row: any) {
   let dialogRef= this.dialog.open(MatFormComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((data)=>{
      console.log(data)
      this.getAllProduct();
    })
  }
}
