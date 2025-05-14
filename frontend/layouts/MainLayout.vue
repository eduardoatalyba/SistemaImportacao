<template>
  <div class="main-layout">
    <!-- Sidebar -->
    <div :class="['sidebar', { collapsed, active: sidebarVisible }]">
      <!-- Avatar -->
      <div class="avatar" @click="toggleSidebar">
        <img src="https://i.pravatar.cc/100" alt="User" />
        <span v-if="!collapsed">Olá, Usuário</span>
      </div>

      <!-- Navegação -->
      <ul class="menu">

        <li @click="$router.push('/register')">
          <span class="icon">📋</span>
          <span v-if="!collapsed">Cadastro Usuários</span>
        </li>

        <li @click="$router.push('/admin/registerOrganization')">
          <span class="icon">📁</span>
          <span v-if="!collapsed">Cadastros Organização</span>
        </li>

        <li @click="$router.push('/admin/users')">
          <span class="icon">📋</span>
          <span v-if="!collapsed">Usuários</span>
        </li>

        <li @click="alert('construcao')">
          <span class="icon">⚙️</span>
          <span v-if="!collapsed">Configurações</span>
        </li>

      </ul>

      <!-- Logout -->
      <div class="logout" @click="logout">
        <span class="icon">🚪</span>
        <span v-if="!collapsed">Sair</span>
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
      sidebarVisible: false
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
      this.sidebarVisible = !this.sidebarVisible;
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

.public-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}


/* Garante 100% da altura e largura */
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
}

/* Sidebar padrão */
.sidebar {
  background-color: #2c3e50;
  color: white;
  width: 240px;
  padding: 20px;
  transition: width 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


/* Sidebar colapsada (desktop) */
.sidebar.collapsed {
  width: 80px;
}

/* Avatar */
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 30px;
}
.avatar img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.avatar span {
  font-weight: bold;
}

/* Menu */
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.menu li:hover {
  color: #1abc9c;
}

/* Icones */
.icon {
  width: 30px;
  text-align: center;
  font-size: 18px;
}

/* Logout */
.logout {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #e74c3c;
  font-weight: bold;
  margin-top: 20px;
  transition: 0.3s;
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
