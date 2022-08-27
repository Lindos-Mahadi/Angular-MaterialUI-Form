import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshNessList: string[] = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private callApi: ApiServiceService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({

      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required]

    })
  }
  addProduct() {
    if (this.productForm.valid) {
      this.callApi.postProduct(this.productForm.value).subscribe((result) => {
        alert("Product added successfully");
        this.productForm.reset();
        console.table(result);
      })
    }
    error: () => {
      alert("Error! While adding the product");
    }

  }

}
