import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DropdownDirective } from './navigation/dropdown.directive';
import { CollapseDirective } from './navigation/collapse.directive';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './authentication/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { GameAllComponent } from './game/game-all/game-all.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';
import { GameComponent } from './game/game/game.component';
import { GameService } from './game/game.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    DropdownDirective,
    CollapseDirective,
    GameAllComponent,
    GameCreateComponent,
    GameDetailsComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [ 
    AuthService,
    GameService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
