import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  categories$;
  category: string;
  subscrioption: any;
  filteredProducts: any[] = [];
  constructor(
    productService: ProductService,

    categoryService: CategoryService,
    activatedRoute: ActivatedRoute
  ) {
    productService
      .getAll().pipe(switchMap(products => {
        this.products = products;
        return activatedRoute.queryParamMap;
      })).subscribe((params) => {
        this.category = params.get('category');

        // filter products by category
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.data.category === this.category)
          : this.products;
      });

    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {}
}
