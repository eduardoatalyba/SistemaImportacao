<template>
  <div class="main-layout">
    
    <div class="topbar d-md-none">
      <i class="bi bi-list menu-toggle" @click="toggleSidebar"></i>
      <span class="user-name">Olá, {{ userName }}</span>
    </div>

   
    <div :class="['sidebar', { collapsed, 'sidebar-hidden': isMobile && !sidebarVisible }]">
      
      <div class="avatar" @click="toggleSidebar">
        <img src="https://i.pravatar.cc/100" alt="Avatar" />
        <span v-if="!collapsed && !isMobile">Olá, {{ userName }}</span>
      </div>

      
      <ul class="menu">
        <li @click="$router.push('/register')">
          <i class="bi bi-person-plus"></i>
          <span v-if="!collapsed">Cadastro Usuários</span>
        </li>

        <li @click="$router.push('/admin/registerOrganization')">
          <i class="bi bi-building"></i>
          <span v-if="!collapsed">Organizações</span>
        </li>

        <li @click="toggleSubmenu('register')">
          <div class="submenu-title">
            <i class="bi bi-people"></i>
            <span v-if="!collapsed">Cadastro</span>
            <span v-if="!collapsed" class="triangle">{{ activeSubmenu === 'register' ? '▼' : '▶' }}</span>
          </div>
        </li>
        <ul v-show="activeSubmenu === 'register' && !collapsed" class="submenu">
          <li @click="$router.push('/admin/users')">Usuários</li>
          <li @click="$router.push('/admin/registerOrganization')">Empresa</li>
          <li @click="alert('Em construção')">Adicionar Usuário</li>
        </ul>
        
        <li @click="toggleSubmenu('settings')">
          <div class="submenu-title">
            <i class="bi bi-gear"></i>
            <span v-if="!collapsed">Configurações</span>
            <span v-if="!collapsed" class="triangle">{{ activeSubmenu === 'settings' ? '▼' : '▶' }}</span>
          </div>
        </li>
        <ul v-show="activeSubmenu === 'settings' && !collapsed" class="submenu">
          <li @click="$router.push('/admin/users')">Usuários Cadastrados</li>
          <li @click="alert('Em construção')">Adicionar Usuário</li>
        </ul>
        
        <li @click="toggleSubmenu('report')">
          <div class="submenu-title">
            <i class="bi bi-gear"></i>
            <span v-if="!collapsed">Cadastro</span>
            <span v-if="!collapsed" class="triangle">{{ activeSubmenu === 'report' ? '▼' : '▶' }}</span>
          </div>
        </li>
        <ul v-show="submenuVisible && !collapsed" class="submenu">
          <li @click="$router.push('/admin/users')">Usuários Cadastrados</li>
          <li @click="alert('Em construção')">Adicionar Usuário</li>
        </ul>

        <li @click="alert('Em construção')">
          <i class="bi bi-gear"></i>
          <span v-if="!collapsed">Configurações</span>
        </li>
      </ul>

      
      <div class="logout" @click="logout">
        <i class="bi bi-box-arrow-right"></i>
        <span v-if="!collapsed">Sair</span>
      </div>
    </div>

    
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      activeSubmenu: null,
      userName: "",
      sidebarVisible: false,
      isMobile: false
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName") || "Usuário";
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarVisible = !this.sidebarVisible;
      } else {
        this.collapsed = !this.collapsed;
      }
    },

    toggleSubmenu(key) {
    this.activeSubmenu = this.activeSubmenu === key ? null : key;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    checkScreen() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.sidebarVisible = false;
        this.collapsed = false;
      }
    }
  }
};
</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";

.main-layout {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.topbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1000;
}

.menu-toggle {
  font-size: 24px;
  cursor: pointer;
}

.user-name {
  margin-left: 16px;
  font-size: 16px;
}

.sidebar {
  background-color: #2c3e50;
  color: white;
  width: 220px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease, transform 0.3s ease;
  z-index: 999;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar.sidebar-hidden {
  transform: translateX(-100%);
  position: fixed;
  top: 50px;
  height: calc(100vh - 50px);
}

.avatar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.menu > li {
  font-size: 14px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s;
}

.menu > li:hover {
  background-color: #34495e;
}

.submenu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: background 0.2s;
}

.triangle {
  font-size: 12px;
  margin-left: 8px;
}

.submenu {
  list-style: none;
  padding-left: 16px;
  margin: 4px 0 8px 0;
}

.submenu > li {
  font-size: 13px;
  padding: 6px 0;
  cursor: pointer;
}

.submenu > li:hover {
  text-decoration: underline;
}

.logout {
  font-size: 14px;
  color: #e74c3c;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid #3e3e3e;
  margin-top: 20px;
}

.logout:hover {
  background-color: #c0392b;
}

.content {
  flex-grow: 1;
  padding: 24px;
  background-color: #f5f5f5;
  overflow-y: auto;
  font-size: 14px;
  /*margin-left: 220px;*/
}

@media (max-width: 767px) {
  .content {
    margin-left: 0;
    padding-top: 60px;
  }
}
</style>
