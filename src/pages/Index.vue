<template>
  <div class="app body">
    <div class="startModal" v-if="component">

      <div class="eclipse hide" style="opacity: 1;"></div>
      <div>

        <h3 class="q-pa-md title">Código da sala</h3>
        <div class="alignItems">
          <span class="subr">
            SUBR-
          </span>
          <q-input dark color="purple" label-color="white" v-model="uuid" class="input" mask="xxxxxxxx" />
        </div>
      </div>
      <q-btn class="primarybutton" color="purple" @click="enterInARoom(uuid)" label="Entrar na sala" />
      <q-btn class="primarybutton" color="purple" @click="(component = false), createNewRoom()"
        label="Criar uma nova sala" />
    </div>
    <div v-else>
      <p class="uuid">{{ 'SUBR-' + uuid.split('SUBR')[1] }}</p>
      <button :class="`mic ${isRecording ? 'recording' : ''}`" @click="toggleMic">
        {{ isRecording ? 'Parar gravação' : 'Começar gravar' }}
      </button>
      <button class="saveText" @click="saveTextButton">Salvar texto</button>
      <button class="saveFile">Salvar arquivo com todo texto</button>
      <div class="socketmessage transcript" v-text="socketmessage"></div>

    </div>
  </div>
</template>

<script setup >
import { ref } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9999');

const uuid = ref('');
const component = ref(true);
const transcript = ref('');
const socketmessage = ref('');
const isRecording = ref(false);
let silenceTimeout = null; // Temporizador de silêncio
let recognition;
let saveText;

function saveTextButton() {
  console.log('salvando texto');
  console.log(transcript.value);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  saveText.push(transcript.value);

}

function enterInARoom(code) {
  console.log(code);
  socket.emit('joinRoom', code);

  socket.on('message', (message) => {
    socketmessage.value = message;
  });
}

function createNewRoom() {
  uuid.value = CreateUUID();
  socket.emit('createRoom', uuid.value);
  enterInARoom(uuid.value);
}

const sendWordsToBackend = () => {
  socket.emit('sendWords', transcript.value);
};

socket.on('wordsReceived', (data) => {
  socketmessage.value = data;
  console.log(data);
  socket.emit('checkRoom', 'room1');
});


socket.on('checkRoomResponse', (isInRoom) => {
  if (isInRoom) {
    console.log('Client is in room1');
  } else {
    console.log('Client is not in room1');
  }
});

socket.on('sendWords', (data) => {
  console.log(data);
  socketmessage.value = data;

});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
  console.log('Speech recognition started');
  isRecording.value = true;
};

recognition.onend = () => {
  console.log('Speech recognition stopped');
  isRecording.value = false;
  // Reinicie o temporizador de silêncio após o término
};

recognition.onresult = (event) => {
  clearTimeout(silenceTimeout); // Limpe o temporizador de silêncio

  const interimTranscript = [];
  for (let i = 0; i < event.results.length; i++) {
    const result = event.results[i][0];
    if (result.isFinal) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      transcript.value.push(result.transcript);
      // Envie as palavras para o backend
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      sendWordsToBackend(result.transcript);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      interimTranscript.push(result.transcript);
    }
  }
  if (interimTranscript.length > 0) {
    transcript.value = interimTranscript.join(' ');
    // Envie as palavras intermediárias para o backend, se necessário
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    sendWordsToBackend(interimTranscript.join(' '));
  }
};


const toggleMic = () => {
  if (isRecording.value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    recognition.stop();
  } else {
    // transcript.value = '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    recognition.start();
  }
};

// Função para iniciar o temporizador de silêncio

const CreateUUID = () => {
  return 'SUBRxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

.uuid {
  color: #fff;
  font-size: 1.5em;
  margin-top: 20px;
  font-weight: bold;
}

.transcript {
  color: #fff;
  font-size: 1.5em;
  margin-top: 20px;

}

.eclipse.buttoneclipse {
  z-index: -1;
  width: 230px;
  height: 70px;
  opacity: .5;
  filter: contrast(210%) blur(50px);
  transition: all 50ms cubic-bezier(.645, .045, .355, 1);
  top: 30px;
  transform: translate(0);
}

.eclipse {
  z-index: 1;
  width: 100%;
  height: 1000px;
  opacity: 0;
  filter: contrast(210%) blur(110px);
  mix-blend-mode: normal;
  background-image: linear-gradient(270deg, #f971ba, #5500be);
  border-radius: 100%;
  position: absolute;
  top: -910px;
}

.eclipse.hide {
  width: 100%;
  height: 200px;
  opacity: .34;
  filter: contrast(210%) blur(40px);
  top: -153px;
}

body {
  background: #281936;
  color: #FFF;
}

.app {
  text-align: center;
  padding: 20px;
}

.mic {
  background-color: #a1049a;
  color: #FFF;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px
}

.mic.recording {
  background-color: red;
}

.transcript {
  margin-top: 20px;
  font-size: 24px;
}

.body {
  background-color: #0d0a12;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: Be Vietnam Pro;
}

.startModal {
  width: 50dvw;
  height: 50dvh;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: Be Vietnam Pro;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(135, 31, 126, 0.37);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 10px;
  border: 1px solid rgba(43, 40, 40, 0.18);
  flex-direction: column;
}

.alignItems {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.title {
  color: #fff;
  font-size: 3.5em;
}

.subr {
  color: #fff;
  margin-right: 10px;
}

.saveText {
  background-color: green;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;
  color: #fff;
}

.saveFile {
  background-color: blue;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;
  color: #fff;
}
</style>
