import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
 
@Component({
  selector: 'app-mat-form',
  templateUrl: './mat-form.component.html',
  styleUrls: ['./mat-form.component.css'],
})
export class MatFormComponent implements OnInit {
  // user defined variables
  productForm!: FormGroup;

  // default array
  categories: any = ['Fruits', 'Electronics', 'Cosmetics'];
  producttypes: any = ['Brand New', 'Second Hand', 'Refurbished'];

  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<MatFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      freshness: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productForm.patchValue({
      productName: this.editData.productName,
      category: this.editData.category,
      freshness: this.editData.freshness,
      price: this.editData.price,
      comment: this.editData.comment,
      date: this.editData.date,
    });
  }

  submitProductForm() {
    if (this.productForm.valid && !this.editData) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Product added successfully!');
          this.productForm.reset();
          this.dialogRef.close('saved');
          this.api.getProduct();
        },
        error: () => {
          alert('Error while adding the product!');
        },
      });
      console.log(this.productForm.value);
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: () => {
        alert('Product Updated Successfully!');
        this.productForm.reset();
        this.dialogRef.close('updated');
      },
      error: (error) => {
        alert('error while updating record!');
      },
    });
  }
}
