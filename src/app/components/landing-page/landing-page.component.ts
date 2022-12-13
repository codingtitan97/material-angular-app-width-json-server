import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormComponent } from '../mat-form/mat-form.component';
import { ApiService } from 'src/app/service/api.service';
// import { MatTableDataSource } from '@angular/material/table';
// import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(public dialog: MatDialog,private api:ApiService) {}
  // @ViewChild(DataTableComponent, {static : true}) private child : DataTableComponent;
  ngOnInit(): void {}

  

  openDialog() {
    const dialogRef = this.dialog.open(MatFormComponent);
    dialogRef.afterClosed().subscribe(() => {
    
    });
  }
}
