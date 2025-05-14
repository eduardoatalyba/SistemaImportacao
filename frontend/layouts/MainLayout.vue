<template>
  <div class="main-layout">
    <!-- Sidebar -->
    <div :class="['sidebar', { collapsed, active: sidebarVisible }]">
      <!-- Avatar -->
      <div class="avatar d-flex align-items-center cursor-pointer" @click="toggleSidebar">
        <img src="https://i.pravatar.cc/100" alt="User" class="rounded-circle" width="40" height="40" />
        <span v-if="!collapsed" class="ms-2">Olá, Usuário</span>
      </div>

      <!-- Navegação -->
      <ul class="nav flex-column">
        <li class="nav-item" @click="$router.push('/register')">
          <a class="nav-link d-flex align-items-center">
            <span class="icon">📋</span>
            <span v-if="!collapsed" class="ms-2">Cadastro Usuários</span>
          </a>
        </li>

        <li class="nav-item" @click="$router.push('/admin/registerOrganization')">
          <a class="nav-link d-flex align-items-center">
            <span class="icon">📁</span>
            <span v-if="!collapsed" class="ms-2">Cadastros Organização</span>
          </a>
        </li>

        <!-- Submenu -->
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" @click="toggleSubmenu">
            <span class="icon">📋</span>
            <span v-if="!collapsed" class="ms-2">Usuários</span>
          </a>
          <ul v-show="submenuVisible" class="nav flex-column ms-3">
            <li class="nav-item">
              <a class="nav-link" @click="$router.push('/admin/users')">Usuários Cadastrados</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="alert('Em construção')">Adicionar Usuário</a>
            </li>
          </ul>
        </li>

        <li class="nav-item" @click="alert('Em construção')">
          <a class="nav-link d-flex align-items-center">
            <span class="icon">⚙️</span>
            <span v-if="!collapsed" class="ms-2">Configurações</span>
          </a>
        </li>
      </ul>

      <!-- Logout -->
      <div class="logout d-flex align-items-center cursor-pointer" @click="logout">
        <span class="icon">🚪</span>
        <span v-if="!collapsed" class="ms-2">Sair</span>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      collapsed: false,
      sidebarVisible: false,
      submenuVisible: false
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleSubmenu() {
      this.submenuVisible = !this.submenuVisible;
    },
    logout() {
      alert("Logout feito! (ainda não conectado a backend)");
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  background-color: #2c3e50;
  color: white;
  width: 240px;
  padding: 20px;
  transition: width 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 80px;
}

.avatar {
  cursor: pointer;
  margin-bottom: 30px;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 15px;
}

.nav-link {
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.nav-link:hover {
  color: #1abc9c;
}

.icon {
  width: 30px;
  text-align: center;
  font-size: 18px;
}

.logout {
  margin-top: auto;
  color: #e74c3c;
  font-weight: bold;
}

.logout:hover {
  color: #ff7660;
}

/* Conteúdo principal */
.content {
  flex: 1;
  background-color: #f4f4f4;
  padding: 40px;
  overflow-y: auto;
}

/* Responsividade: sidebar mobile */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .content {
    padding: 20px;
  }
}
</style>
