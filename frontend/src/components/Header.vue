<template>
  <header class="header">
    <h1 class="header-text">Día Nacional Del Cepillado 2024 - Colgate</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Ajusta la altura del header */
  background-color: #d71b16;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Asegura que el header esté por encima de otros elementos */
}

.header-text {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 18px; /* Ajusta el tamaño del texto */
  color: #fff;
}
</style>
