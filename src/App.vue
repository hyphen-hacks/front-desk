<template>
  <div id="app">
    <nav id="topNav">
      <img src="@/assets/logo.svg" class="brand__image" alt="">
      <h1 class="brand">Hyphen-Hacks Front Desk v<span>{{version}}</span></h1>
      <a class="toDash" href="https://dashboard.hyphen-hacks.com">dashboard</a>
    </nav>
    <loading v-if="!roster.length"></loading>
    <router-view/>
  </div>
</template>
<script>
  import 'minireset.css'
  import './assets/app.scss'
import loading from './components/loading'
  export default {
    name: 'appContainer',
    components: {loading},
    data() {
      return {
        version: require('../package.json').version,
        roster: [],
        rosterObject: {}
      }
    },
    created() {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$firebase.firestore().collection('people').onSnapshot(snap => {
            console.log('got data')
            this.loading = false;
            this.roster = []
            snap.forEach(person => {
              this.roster.push(person.data())
              this.rosterObject[person.data().id] = person.data()
            })

          })
        } else {
          console.log('no user')
          this.$router.push('/login')
        }
      })
    }

  }
</script>

