import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): any {
    return this.db.list('/categories').snapshotChanges()
    .pipe(map(items => {             // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }
}
