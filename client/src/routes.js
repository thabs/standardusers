import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

//! Users
const Users = React.lazy(() => import('./views/Users'));
const UserEdit = React.lazy(() => import('./views/UserEdit'));
const UserCreate = React.lazy(() => import('./views/UserCreate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users, exact: true },
  { path: '/users/edit/:userId', name: 'User Edit', component: UserEdit, exact: true },
  { path: '/users/new', name: 'New User', component: UserCreate, exact: true },
];

export default routes;
