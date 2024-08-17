<template>
  <div class="body">
    <div class="eclipse hide" style="opacity: 1;"></div>
    <div class="alignBody">
      <h1 class="title"><span class="subr">SUBR</span> acessibilidade auditiva</h1>
      <p class="subtitle">
        Aplicação com finalidade de transcrever em tempo real o que está sendo dito no microfone, para auxiliar pessoas
        com deficiência auditiva a acessibilidade.
      </p>
      <div>
        <a class="button-29" href="/#/lobby" role="button">Usar Aplicação</a>
      </div>
      <div class="image">
        <img class="prop" src=".././images/earglass.png" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&family=Urbanist:wght@700&display=swap');

.title {
  color: white;
  text-align: center;
}

.image {
  height: 30%;
  overflow: hidden;
}

.prop {
  height: 100%;
  object-fit: contain;
  opacity: 0.1;
  position: absolute;
  top: 0;
}

.subr {
  color: #5500be;
  font-weight: 900;
}

.subtitle {
  color: rgb(97, 97, 97);
  font-size: 1.2rem;
  padding-left: 20%;
  padding-right: 20%;
  font-weight: 400;
  text-align: center;
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

.body {
  background-color: #0d0a12;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Be Vietnam Pro;
  user-select: none;
}

.primarybutton {
  color: #fff;
  text-shadow: 0 2px rgba(0, 0, 0, .11);
  background-color: rgba(0, 0, 0, 0);

  border: 1px #000;
  border-radius: 70px;
  padding: 20px 32px;
  font-family: Satoshi, sans-serif;
  font-size: 1.3em;
  font-weight: 500;
  transition: all .2s;
  display: flex;
  position: relative;
  box-shadow: 0 19px 20px -18px rgba(0, 0, 0, .46), inset 0 1px rgba(255, 255, 255, .63);
}

/* CSS */
.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5500be 0, #ff54e8 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s, transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
  z-index: 9999;
}

.button-29:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #be3fae 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #722568 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #d446c1 0 3px 7px inset;
  transform: translateY(2px);
}

.alignBody {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
