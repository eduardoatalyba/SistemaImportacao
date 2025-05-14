<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
  
      <div class="metrics">
        <div class="metric-box">
          <h3>Total de Tabelas</h3>
          <p>{{ totalTables }}</p>
        </div>
        <div class="metric-box">
          <h3>Usuários Ativos</h3>
          <p>{{ activeUsers }}</p>
        </div>
        <div class="metric-box">
          <h3>Última Atualização</h3>
          <p>{{ lastUpdate }}</p>
        </div>
      </div>
  
      <div class="chart">
        <h3>Gráfico de Atividade</h3>
        <div class="chart-box">
          <p>Aqui vai o gráfico de atividades. (ex: de vendas, acesso, etc.)</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardPage", // Novo nome de componente
    data() {
      return {
        totalTables: 10, // Exemplo de número de tabelas
        activeUsers: 150, // Exemplo de número de usuários ativos
        lastUpdate: '2025-04-13 12:00:00', // Exemplo de última atualização
      };
    },
    mounted() {
      // Aqui você pode fazer chamadas para a API para buscar os dados dinamicamente
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 40px;
    background-color: #f4f4f4;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .metrics {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .metric-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex: 1;
  }
  
  .metric-box h3 {
    font-size: 18px;
    color: #333;
  }
  
  .metric-box p {
    font-size: 24px;
    color: #2c3e50;
  }
  
  .chart {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .chart h3 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .chart-box {
    background-color: #eaeaea;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    border-radius: 8px;
  }
  </style>