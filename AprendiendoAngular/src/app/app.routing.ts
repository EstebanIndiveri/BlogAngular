import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

//importar los componentes dec pagina exclusiva.
import { HomeComponent } from "./components/home/home.component";
import { BlogComponent } from "./components/blog/blog.component";
import { FormularioComponent } from "./components/formulario/formulario.component";
import { PeliculasComponent } from "./components/peliculas/peliculas.component";
import { PaginaComponent } from "./components/pagina/pagina.component";
import { ErrorComponent } from './components/error/error.component';


// array de rutas

const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'blog',component:BlogComponent},
    {path:'formulario',component:FormularioComponent},
    {path:'peliculas',component:PeliculasComponent},
    {path:'pagina-test',component:PaginaComponent},
    {path:'pagina-test/:nombre/:apellidos',component:PaginaComponent},
    {path:'**',component:ErrorComponent}
];
//exporto el modulo de rutas

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);