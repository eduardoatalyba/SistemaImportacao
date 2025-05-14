<template>
  <div :class="containerClass">
    <div class="register-box">
      <h2 class="title">Registro de Usuário</h2>

      <!-- Notificação de erro -->
      <div v-if="error" class="notification is-danger">
        {{ error }}
      </div>

      <!-- Notificação de sucesso -->
      <div v-if="success" class="notification is-success">
        {{ success }}
      </div>

      <div class="field">
        <label class="label">Nome</label>
        <input type="text" placeholder="Nome do usuário" class="input" v-model="name" @input="clearMessages" />
      </div>

      <div class="field">
        <label class="label">E-mail</label>
        <input type="email" placeholder="email@email.com" class="input" v-model="email" @input="clearMessages" />
      </div>

      <div class="field">
        <label class="label">Senha</label>
        <input type="password" placeholder="******" class="input" v-model="password" @input="clearMessages" />
      </div>

      <div class="field">
        <label class="label">Tipo</label>
        <select class="input" v-model="role" @change="clearMessages">
          <option disabled value="">Selecione o tipo</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      <button class="button is-success is-fullwidth mt-4" @click="registerUser">Cadastrar</button>
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
  computed: {
    containerClass() {
      return localStorage.getItem("token")
        ? "register-container-logged"
        : "register-container-public";
    }
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
        this.success = `Usuário "${res.data.user.name}" cadastrado com sucesso!`;

        // Resetar o formulário
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = '';
        this.error = '';
      } catch (err) {
        this.success = '';
        this.error = err.response?.data?.msg || 'Erro ao cadastrar usuário.';
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

/* select */
.option {
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
