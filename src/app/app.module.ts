import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthService} from './auth.service';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
