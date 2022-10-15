import {Navigate, useRoutes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemoDetailPage from './pages/MemoDetailPage';
import MemoEditPage from './pages/MemoEditPage';
import MemoManagerPage from './pages/MemoManagerPage';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
        path: '/manager',
        element: <MemoManagerPage />,
    },
    {
        path: '/:id',
        element: <MemoDetailPage />,
    },
    
    {
        path: '/:id/edit',
        element: <MemoEditPage />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} />,
    },
]);
};

export default Routes;
