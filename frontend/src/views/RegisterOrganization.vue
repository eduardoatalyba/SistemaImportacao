<template>
    <div :class="containerClass">
      <div class="register-box">
        <h2 class="title">Registro de Organização</h2>
  
        <div v-if="error" class="notification is-danger">{{ error }}</div>
        <div v-if="success" class="notification is-success">{{ success }}</div>
  
        <div class="field">
          <label class="label">Nome da Organização</label>
          <input
            type="text"
            class="input"
            placeholder="Nome da Organização"
            v-model="name"
            @input="clearMessages"
          />
        </div>
  
        <div class="field">
          <label class="label">Endereço</label>
          <input
            type="text"
            class="input"
            placeholder="Endereço"
            v-model="address"
            @input="clearMessages"
          />
        </div>
  
        <div class="field">
          <label class="label">Telefone</label>
          <input
            type="text"
            class="input"
            placeholder="Telefone"
            v-model="phone"
            @input="clearMessages"
          />
        </div>
  
        <div class="field">
          <label class="label">E-mail</label>
          <input
            type="email"
            class="input"
            placeholder="organization@email.com"
            v-model="email"
            @input="clearMessages"
          />
        </div>
  
        <button class="button is-success is-fullwidth mt-4" @click="register">
          Cadastrar
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        address: "",
        email: "",
        phone: "",
        error: "",
        success: ""
      };
    },
    computed: {
      containerClass() {
        return localStorage.getItem("token")
          ? "register-container-logged"
          : "register-container-public";
      }
    },
    methods: {
      clearMessages() {
        this.error = "";
        this.success = "";
      },
      async register() {
        try {
          const payload = {
            name: this.name,
            address: this.address,
            email: this.email,
            phone: this.phone
          };
  
          const res = await axios.post(
            "http://localhost:3000/api/v1/organization/",
            payload
          );
  
          this.success = `Organização "${res.data.organization.name}" cadastrada com sucesso!`;
          this.name = "";
          this.address = "";
          this.email = "";
          this.phone = "";
          this.error = "";
        } catch (err) {
          this.success = "";
          this.error =
            err.response?.data?.msg || "Erro ao cadastrar organização.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Layout externo (não logado) */
  .register-container-public {
    height: 100vh;
    background-color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  /* Layout interno (logado) */
  .register-container-logged {
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    min-height: 100%;
  }
  
  /* Caixa de cadastro */
  .register-box {
    background-color: white;
    padding: 40px 30px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Título */
  .title {
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
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
  