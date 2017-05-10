import App from 'app/components/App';
import { Dashboard, ItemDetails } from 'app/components/modules';

export default [
    {
        component: App,
        path: '/',
        indexRoute: {
            component: Dashboard,
        },
        childRoutes: [
            {
                component: ItemDetails,
                path: '/:type/:id',
            },
        ],
    },
];
