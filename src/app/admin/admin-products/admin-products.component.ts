import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { FirebaseObject } from 'src/app/models/FirebaseObject';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: FirebaseObject[];
  subscription: Subscription;
  filteredProducts: any[];
  items: any;
  itemCount;
  data: any;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products;
      this.data = this.products.map( x => x.data);
      // this.initializeTable(this.data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  filter(query: string): void {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.data.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.filteredProducts;
  }

  // reloadItems(params): void {
  //   if (!this.tableResource) {return;}
  //   this.tableResource.query(params).then(items => this.items = items);
  // }

  // private initializeTable(products: Product[]): void {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({offset: 0}).then(items => this.items = items);
  //   this.tableResource.count().then(count => this.itemCount = count);
  // }

}
