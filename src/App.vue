<template>
  <div id="app">
    <nav id="topNav">
      <img src="@/assets/logo.svg" class="brand__image" alt="">
      <h1 class="brand">Hyphen-Hacks Front Desk v<span>{{version}}</span></h1>
      <a class="toDash" href="https://dashboard.hyphen-hacks.com">dashboard</a>
    </nav>
    <router-view/>
  </div>
</template>
<script>
  import 'minireset.css'
  import './assets/app.scss'

  export default {
    name: 'appContainer',
    data() {
      return {
        version: require('../package.json').version
      }
    }
  }
</script>

