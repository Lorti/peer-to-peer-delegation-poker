<template>
  <div>
    <div v-if="!isHost && !isParticipant">
      <p>
        <button @click="startSession">Start a new delegation poker session</button>
      </p>
      <p>
        <input v-model="destinationId" type="text" placeholder="ID of your host"><br>
        <input v-model="name" type="text" placeholder="Your name"><br>
        <button @click="connect(destinationId)">Connect to a delegation poker session</button>
      </p>
    </div>
    <div v-if="isHost">
      <p>
        <input :value="sourceId" readonly>
      </p>
      <p>
        <textarea v-model="keyDecisionArea"
                  placeholder="What key decision area are we talking about?"/><br>
        <button @click="startRound">Start a new round</button>
      </p>
      <Participant
        v-for="participant in remotePeers" :key="participant.id"
        :name="participant.name"
        :card="participant.card"
        :show-card="showResults"
        @remove-participant="removeParticipant(participant)"
      />
    </div>
    <div v-if="isParticipant && !card">
      <p>
        <span v-if="keyDecisionArea">{{ keyDecisionArea }}</span>
        <span v-else>Thank you. Please wait for the next round ...</span>
      </p>
      <p v-if="keyDecisionArea">
        <button class="votingButton" @click="vote(1)">
          <img class="votingButton__image" src="../assets/1-tell.png" alt="1">
        </button>
        <button class="votingButton" @click="vote(2)">
          <img class="votingButton__image" src="../assets/2-sell.png" alt="2">
        </button>
        <button class="votingButton" @click="vote(3)">
          <img class="votingButton__image" src="../assets/3-consult.png" alt="3">
        </button>
        <button class="votingButton" @click="vote(4)">
          <img class="votingButton__image" src="../assets/4-agree.png" alt="4">
        </button>
        <button class="votingButton" @click="vote(5)">
          <img class="votingButton__image" src="../assets/5-advice.png" alt="5">
        </button>
        <button class="votingButton" @click="vote(6)">
          <img class="votingButton__image" src="../assets/6-inquire.png" alt="6">
        </button>
        <button class="votingButton" @click="vote(7)">
          <img class="votingButton__image" src="../assets/7-delegate.png" alt="7">
        </button>
      </p>
    </div>
    <div v-if="card">
      {{ card }}
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
      this.showResults = false;
    },
    startRound() {
      this.remotePeers.forEach((remotePeer) => {
        remotePeer.connection.send(this.keyDecisionArea);
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

<style>
.votingButton {
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
}

.votingButton__image {
  display: block;
  width: 8rem;
  height: 12rem;
  border-radius: 1rem;
}
</style>
