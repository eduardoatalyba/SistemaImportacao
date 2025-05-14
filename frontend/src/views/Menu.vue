<template>
    <div class="container">
      <!-- Sidebar -->
      <div :class="['sidebar', { collapsed }]">
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
          <li @click="alert('Módulo 2 em construção')">
            <span class="icon">📁</span>
            <span v-if="!collapsed">Módulo 2</span>
          </li>
          <li @click="alert('Configurações em breve')">
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
        <h1>Bem-vindo ao Sistema</h1>
        <p>Escolha uma das opções no menu lateral.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MainMenu",
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.collapsed = !this.collapsed;
      },
      logout() {
        alert("Logout feito! (ainda não conectado a backend)");
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .sidebar {
    background-color: #2c3e50;
    color: white;
    width: 240px;
    padding: 20px;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .sidebar.collapsed {
    width: 80px;
  }
  
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
  
  .icon {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
  
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
  
  .content {
    flex: 1;
    background-color: #f4f4f4;
    padding: 40px;
  }
  </style>
  