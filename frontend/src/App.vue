<template>
  <div id="app">
    <Header />
    <GridSection />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import GridSection from './components/GridSection.vue';

export default {
  components: {
    Header,
    GridSection,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
