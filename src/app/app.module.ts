import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { EmployeeformComponent } from "./components/employeeform/employeeform.component";
import { environment } from "src/environments/environment";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthGuard } from "./guards/auth.guard";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeformComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "add-employee",
        component: EmployeeformComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "employee/edit/:id",
        component: EmployeeformComponent,
        canActivate: [AuthGuard],
      },
      { path: "**", component: HomeComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
