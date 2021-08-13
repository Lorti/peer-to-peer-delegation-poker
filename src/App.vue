<template>
  <div class="container mx-auto	px-4">
    <h1 class="text-4xl my-8">Delegation Poker</h1>
    <Poker/>
  </div>
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
}

.input {
  @apply appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent;
}

.button {
  @apply flex-shrink-0 bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 disabled:opacity-50;
}

.card {
  overflow: hidden;
  width: 8rem;
  height: 12rem;
  @apply rounded-xl shadow-lg;
}
</style>
