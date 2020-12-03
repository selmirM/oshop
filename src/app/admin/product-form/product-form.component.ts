import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { take } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product?: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      console.log(this.id);
      this.product = this.productService.get(this.id).subscribe((p) => {
        this.product = p;
      });
    }
  }

  // Save product in db
  save(product): void {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }
  
  // delete product in db
  delete(): void {
    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
    return;
  }

  ngOnInit(): void {}
}
