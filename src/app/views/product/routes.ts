import { Routes } from '@angular/router';

 
 export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Products'
          },
        children: [
    {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
    },
    {
        path: 'manage-products',
        loadComponent: () => import('./product/product.component').then(m => m.ProductComponent),
        data: {
        title: 'Manage products',
        }
    },

    ]
}
];
