import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product: any): any {
    return this.db.list('/products').push(product);
  }

  getAll(): any {
    return this.db.list('/products').snapshotChanges()
    .pipe(map(items => {             // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  get(productId): any {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product): any {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId): any {
    return this.db.object('/products/' + productId).remove();

  }
}
