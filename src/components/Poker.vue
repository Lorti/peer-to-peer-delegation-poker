<template>
  <div>
    <div v-if="!isHost && !isParticipant">
      <div class="flex flex-col gap-3 max-w-sm mx-auto">
        <button class="button" @click="startSession">Start a new delegation poker session</button>
        <p>or</p>
        <input class="input" v-model="destinationId" type="text" placeholder="ID of your host">
        <input class="input" v-model="name" type="text" placeholder="Your name">
        <button class="button" @click="connect(destinationId)">Connect to a delegation poker session</button>
      </div>
    </div>
    <div v-if="isHost">
      <label class="block">
        Your host ID is <input class="input w-auto" :value="sourceId" size="36" readonly>.
      </label>
      <div class="flex gap-3 my-12">
        <textarea class="input" v-model="keyDecisionArea"
                  placeholder="What key decision area are we talking about?"/>
        <button class="button" @click="startRound" :disabled="roundStarted">Go!</button>
      </div>
      <Participant
        class="mx-1"
        v-for="participant in remotePeers" :key="participant.id"
        :name="participant.name"
        :card="participant.card"
        :show-card="showResults"
        @remove-participant="removeParticipant(participant)"
      />
      <p v-if="!remotePeers.length">
        Please wait for participants ...
      </p>
    </div>
    <div v-if="isParticipant">
      <p v-if="!keyDecisionArea">Hello, {{ name }}!</p>
      <template v-else>
        <p class="text-lg my-8">{{ keyDecisionArea }}</p>
        <template v-if="!card">
          <button @click="vote(1)"><img class="card mx-1" src="../assets/1-tell.png" alt="1"></button>
          <button @click="vote(2)"><img class="card mx-1" src="../assets/2-sell.png" alt="2"></button>
          <button @click="vote(3)"><img class="card mx-1" src="../assets/3-consult.png" alt="3"></button>
          <button @click="vote(4)"><img class="card mx-1" src="../assets/4-agree.png" alt="4"></button>
          <button @click="vote(5)"><img class="card mx-1" src="../assets/5-advice.png" alt="5"></button>
          <button @click="vote(6)"><img class="card mx-1" src="../assets/6-inquire.png" alt="6"></button>
          <button @click="vote(7)"><img class="card mx-1" src="../assets/7-delegate.png" alt="7"></button>
        </template>
        <template v-else>
          <img class="card mx-auto" v-if="card === 1" src="../assets/1-tell.png" alt="1">
          <img class="card mx-auto" v-if="card === 2" src="../assets/2-sell.png" alt="2">
          <img class="card mx-auto" v-if="card === 3" src="../assets/3-consult.png" alt="3">
          <img class="card mx-auto" v-if="card === 4" src="../assets/4-agree.png" alt="4">
          <img class="card mx-auto" v-if="card === 5" src="../assets/5-advice.png" alt="5">
          <img class="card mx-auto" v-if="card === 6" src="../assets/6-inquire.png" alt="6">
          <img class="card mx-auto" v-if="card === 7" src="../assets/7-delegate.png" alt="7">
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import Peer from 'peerjs';
import Participant from './Participant';

export default {
  name: 'HelloWorld',
  components: {
    Participant,
  },
  data() {
    return {
      sourceId: '',
      destinationId: '',
      keyDecisionArea: '',
      roundStarted: false,
      isHost: false,
      peer: null,
      remotePeers: [],
      connection: null,
      name: '',
      card: null,
    }
  },
  computed: {
    isParticipant() {
      return !!this.connection;
    },
    showResults() {
      return this.remotePeers.every(remotePeer => !!remotePeer.card);
    },
  },
  created() {
    this.peer = new Peer();
    this.peer.on('open', (id) => this.sourceId = id);
    this.peer.on('connection', (connection) => {
      const remotePeer = {
        connection,
        id: connection.peer,
        name: connection.metadata.name,
        card: null,
      };
      this.remotePeers.push(remotePeer);
      connection.on('data', (data) => {
        const card = parseInt(data, 10);
        if (card >= 1 && card <= 7) {
          remotePeer.card = card;
          // Trigger Vue's reactivity system by hand ...
          this.remotePeers = this.remotePeers.slice();
        }
      });
    });
  },
  methods: {
    startSession() {
      this.isHost = true;
    },
    startRound() {
      this.roundStarted = true;
      setTimeout(() => this.roundStarted = false, 5000);
      this.remotePeers.forEach((remotePeer) => {
        remotePeer.connection.send(this.keyDecisionArea);
        remotePeer.card = null;
      })
    },
    connect(id) {
      this.connection = this.peer.connect(id, {metadata: {name: this.name}});
      this.connection.on('data', (data) => {
        this.keyDecisionArea = data;
        this.card = null;
      });
    },
    removeParticipant(participant) {
      const index = this.remotePeers.indexOf(participant);
      this.remotePeers.splice(index, 1);
    },
    vote(card) {
      this.card = card;
      this.connection.send(card);
    },
  }
}
</script>
