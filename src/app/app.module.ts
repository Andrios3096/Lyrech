import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PanelComponent } from './pages/panel/panel.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SideebarComponent } from './shared/sideebar/sideebar.component';
import { InformationComponent } from './pages/panel/information/information.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { RegisterEmpresaComponent } from './register-empresa/register-empresa.component';

//servicio
import { AuthService } from './services/auth.service';

import { HttpClientModule } from '@angular/common/http';



//fomrularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//ROUTE
import { AppRoutingModule } from './app.routes';


//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';


import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { NuevaInversionComponent } from './pages/panel/nueva-inversion/nueva-inversion.component';

// graficos
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,

    PanelComponent,
    GraficasComponent,
    NavbarComponent,
    SideebarComponent,
    InformationComponent,
    RegisterComponent,
    PagesComponent,
    PerfilesComponent,
    RegisterEmpresaComponent,
    NuevaInversionComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
    
  ],
  providers: [AuthService,LoginGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
