import { Routes } from '@angular/router';
import { UpdateComponent } from './user-mst/update/update.component';
import { ListComponent } from './user-mst/list/list.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component: DashboardComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'user/new', component: UpdateComponent, canActivate: [authGuard]},
    {path:'user/list', component:ListComponent, canActivate: [authGuard]},
    {path:'**', component: ErrorComponent}
];
