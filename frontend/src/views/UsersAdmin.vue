<template>
    <div>
      <h1>Painel ADM</h1>
      <hr />
  
      <div class="column is-12 has-text-right">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
          title="Incluir"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
  
      <hr />
  
      <div class="columns is-centered">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <!--<td>{{user.role | processRole}}</td>-->
              <td>
                <button
                  type="button"
                  class="btn btn-outline-secondary bi bi-pen"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  title="Editar"
                  @click="openEditModal(user)"
                ></button>
                <button class="btn btn-outline-secondary bi bi-x"></button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal Editar -->
        <div
          class="modal fade"
          id="editModal"
          tabindex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="editModalLabel">Editar Usuário</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div class="modal-body">
                <UserEdit v-if="selectedUser" :user="selectedUser" />
              </div>
            </div>
          </div>
        </div>

                <!-- Modal deletar -->
          <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">Deletar Usuário</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div class="modal-body">
                <UserEdit v-if="selectedUser" :user="selectedUser" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Modal Incluir -->
        <div
          class="modal fade"
          id="registerModal"
          tabindex="-1"
          aria-labelledby="registerModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="registerModalLabel">Incluir Usuário</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div class="modal-body">
                <UserEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Tooltip } from 'bootstrap';
  import UserEdit from '../views/RegisterUser.vue';
  
  export default {
    components: {
      UserEdit,
    },
    data() {
      return {
        users: [],
        selectedUser: null,

      };
    },
    created() {
      const token = localStorage.getItem('token');
      const req = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
  
      axios
        .get('http://localhost:3000/api/v1/user', req)
        .then((res) => {
          this.users = res.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mounted() {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach((el) => {
        new Tooltip(el);
      });
    },
    methods: {
      openEditModal(user) {
        this.selectedUser = user;
      },
    },
    filters: {
      processRole: function (value) {
        if (value == 0) {
          return 'Usuario Comum';
        } else if (value == 1) {
          return 'Admin';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Se quiser desativar influência do Bulma em botões: */
  button.btn {
    all: unset;
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    background-color: white;
    color: #212529;
    font-size: 1rem;
    cursor: pointer;
  }
  button.btn:hover {
    background-color: #f8f9fa;
  }
  </style>
  