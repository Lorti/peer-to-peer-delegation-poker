<template>
  <div class="inline-flex flex-col align-center">
    <span class="text-lg my-4">{{ name }}</span>
    <span class="card flex flex-col justify-between p-4" :class="{
      'shadow-none': !card,
    }" v-if="!showCard">
      <span class="flex-grow" v-show="!card">💭</span>
      <span class="flex-grow" v-show="card">👍</span>
      <button class="text-sm" @click="$emit('removeParticipant')">Remove participant</button>
    </span>
    <img class="card" v-if="showCard && card === 1" src="../assets/1-tell.png" alt="1">
    <img class="card" v-if="showCard && card === 2" src="../assets/2-sell.png" alt="2">
    <img class="card" v-if="showCard && card === 3" src="../assets/3-consult.png" alt="3">
    <img class="card" v-if="showCard && card === 4" src="../assets/4-agree.png" alt="4">
    <img class="card" v-if="showCard && card === 5" src="../assets/5-advice.png" alt="5">
    <img class="card" v-if="showCard && card === 6" src="../assets/6-inquire.png" alt="6">
    <img class="card" v-if="showCard && card === 7" src="../assets/7-delegate.png" alt="7">
  </div>
</template>

<script>
export default {
  name: 'Participant',
  props: {
    name: String,
    card: Number,
    showCard: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
