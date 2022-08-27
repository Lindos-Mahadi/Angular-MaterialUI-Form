import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshNessList: string[] = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  saveButton: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private callApi: ApiServiceService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({

      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required]

    });
    if (this.editData) {
      this.saveButton = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.callApi.postProduct(this.productForm.value).subscribe((result) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        })
      }
      error: () => {
        alert("Error! While adding the product");
      }
    } else {
      this.updateProduct()
    }
  }
  updateProduct() {
    this.callApi.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Updated data Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error! While Updating the product");
      }

    });
  }

}
