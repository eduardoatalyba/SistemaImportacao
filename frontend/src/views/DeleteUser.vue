<template>
    <div class="box">
      <h2>Registro de usuário</h2>
      <hr>
  
      <div class="columns is-centered">
        <div class="column is-half">
          <!-- Notificação de erro -->
          <div v-if="error">
            <div class="notification is-danger">
              {{ error }}
            </div>
          </div>
  
          <!-- Notificação de sucesso -->
          <div v-if="success">
            <div class="notification is-success">
              {{ success }}
            </div>
          </div>
  
          <p>Nome</p>
          <input type="text" placeholder="Nome do usuário" class="input" v-model="name" @input="clearMessages" />
  
          <p>E-mail</p>
          <input type="email" placeholder="email@email.com" class="input" v-model="email" @input="clearMessages" />
  
          <p>Senha</p>
          <input type="password" placeholder="******" class="input" v-model="password" @input="clearMessages" />
  
          <p>Tipo</p>
          <div class="select is-info">
            <select v-model="role" @change="clearMessages">
              <option disabled value="">Selecione o tipo</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
  
          <hr>
          <button class="button is-success" @click="registerUser">Cadastrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        role: '',
        error: '',
        success: ''
      };
    },
    methods: {
      clearMessages() {
        this.error = '';
        this.success = '';
      },
      async registerUser() {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + token
        };
  
        try {
          const payload = {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role
          };
  
          const res = await axios.post('http://localhost:3000/api/v1/user', payload, { headers });
          console.log('Usuário criado:', res.data);
  
          this.error = '';
          this.success = `Usuário "${res.data.user.name}" cadastrado com sucesso!`;
  
          // Resetar o formulário
          this.name = '';
          this.email = '';
          this.password = '';
          this.role = '';
        } catch (err) {
          console.error(err);
          this.success = '';
          if (err.response && err.response.data && err.response.data.msg) {
            this.error = err.response.data.msg;
          } else {
            this.error = 'Erro ao cadastrar usuário.';
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  