import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../../layouts/MainLayout.vue'
import PublicLayout from '../../layouts/PublicLayout.vue'
import RegisterUser from '../views/RegisterUser.vue'
import RegisterOrganization from '@/views/RegisterOrganization.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import Users from '../views/UsersAdmin.vue'
import UsersDelete from '../views/DeleteUser.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterUser
      },
      {
        path: 'admin/users',
        name: 'Users',
        component: Users
      },
      {
        path: 'admin/usersDelete',
        name: 'UsersDelete',
        component: UsersDelete
      },
      {
        path: 'admin/registerOrganization',
        name: 'RegisterOrganizationInternal', // Para o painel administrativo
        component: RegisterOrganization
      }
    ]
  },
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: 'login', component: () => import('../views/LoginUser.vue') },
      { path: 'registerOrganization', name: 'RegisterOrganization', component: RegisterOrganization } // Para o layout público
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 👇 Proteção global de rotas
router.beforeEach(async (to, from, next) => {
  const publicPaths = ['/login', '/registerOrganization'];
  const isPublic = publicPaths.some(path => to.path.startsWith(path));
  const token = localStorage.getItem('token');

  if (isPublic) {
    return next(); // rota pública: segue
  }

  if (!token) {
    return next('/login'); // sem token: redireciona
  }

  try {
    await axios.post("http://localhost:3000/api/v1/controller", {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    next(); // token válido: segue
  } catch (err) {
    console.log('Token inválido:', err.response?.data || err.message);
    next('/login'); // token inválido: redireciona
  }
});

export default router;
