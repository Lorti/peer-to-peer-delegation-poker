<template>
  <Poker/>
</template>

<script>
import Poker from './components/Poker.vue';

export default {
  name: 'App',
  components: {
    Poker,
  },
}
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
