<!-- layouts/PublicLayout.vue -->
<template>
  <div class="public-layout">
    <router-view />
  </div>
</template>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}
</style>