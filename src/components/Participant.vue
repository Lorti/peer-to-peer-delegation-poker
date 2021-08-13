<template>
  <div class="participant">
    <span class="participant__name">{{ name }}</span>
    <span class="participant__card participant__card--back" v-if="!showCard">
      <span class="participant__vote" v-show="!card">&nbsp;</span>
      <span class="participant__vote" v-show="card">✅</span>
      <button class="participant__remove" @click="$emit('removeParticipant')">Remove participant</button>
    </span>
    <img class="participant__card" v-if="showCard && card === 1" src="../assets/1-tell.png" alt="1">
    <img class="participant__card" v-if="showCard && card === 2" src="../assets/2-sell.png" alt="2">
    <img class="participant__card" v-if="showCard && card === 3" src="../assets/3-consult.png" alt="3">
    <img class="participant__card" v-if="showCard && card === 4" src="../assets/4-agree.png" alt="4">
    <img class="participant__card" v-if="showCard && card === 5" src="../assets/5-advice.png" alt="5">
    <img class="participant__card" v-if="showCard && card === 6" src="../assets/6-inquire.png" alt="6">
    <img class="participant__card" v-if="showCard && card === 7" src="../assets/7-delegate.png" alt="7">
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

<style>
.participant {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.participant__name {
  padding: 1rem;
}
.participant__vote {
  flex-grow: 1;
}
.participant__remove {
  margin: 1rem;
}
.participant__card {
  overflow: hidden;
  width: 8rem;
  height: 12rem;
  border-radius: 1rem;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, lightgray 10px, lightgray 20px);
}
.participant__card--back {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
