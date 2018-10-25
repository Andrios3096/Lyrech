import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';


import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PerfilesComponent } from './perfiles/perfiles.component';

import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { AdminGuardGuard } from './services/guards/admin-guard.guard';




const routes: Routes = [

    { path: '', component: PagesComponent, canActivate:[LoginGuardGuard],

    children :[
        { path: 'inicio', component: DashboardComponent, },
        { path: 'panel', component: PanelComponent, },
        { path: 'graficas', component: GraficasComponent, },
        { path: '', pathMatch: 'full', redirectTo:'/inicio' },
    
    ]},
    
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'perfiles', component: PerfilesComponent, canActivate: [AdminGuardGuard] },
    { path: '**',  component: NopagefoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}