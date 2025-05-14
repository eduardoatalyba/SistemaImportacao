<template>
    <div class="login-container">
      <div class="login-box">
        <h2 class="title">Login de Usuário</h2>
  
        <div v-if="error" class="notification is-danger">
          {{ error }}
        </div>
  
        <div class="field">
          <label class="label">E-mail</label>
          <div class="control">
            <input
              type="email"
              class="input"
              placeholder="email@email.com"
              v-model="email"
              required
            />
          </div>
        </div>
  
        <div class="field">
          <label class="label">Senha</label>
          <div class="control">
            <input
              type="password"
              class="input"
              placeholder="******"
              v-model="password"
              required
            />
          </div>
        </div>
  
        <div class="field mt-4">
          <button class="button is-fullwidth" @click="login">Entrar</button>
        </div>
  
        <p class="register-link mt-4">
          <a @click="goToRegisterOrganization" class="cursor-pointer">Primeiro acesso? Cadastre sua organização</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        error: undefined,
      };
    },
    methods: {
      login() {
        axios
          .post("http://localhost:3000/api/v1/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$router.push({ name: "dashboard" });
          })
          .catch((err) => {
            this.error = err.response?.data?.msg || "Erro ao fazer login";
          });
      },
      goToRegisterOrganization() {
        this.$router.push({ name: "RegisterOrganization" });
      },
    },
  };
  </script>
  
  <style scoped>
 
  .login-container {
    height: 100vh;
    background-color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
   
  /* Caixa de cadastro */
  .login-box {
    background-color: white;
    padding: 40px 30px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Título */
  .title {
    color:#2c3e50;
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .cursor-pointer {
  cursor: pointer;
}
  /* Labels */
  .label {
    color: #2c3e50;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  /* Inputs */
  .input {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 15px;
    width: 100%;
  }
  
  /* Botão */
  .button {
    background-color: #1abc9c;
    color: white;
    font-weight: bold;
    border: none;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .button:hover {
    background-color: #16a085;
  }
  
  /* Notificações */
  .notification.is-danger {
    background-color: #e74c3c;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .notification.is-success {
    background-color: #2ecc71;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
  }
  </style>