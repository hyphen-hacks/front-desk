import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCnWcOvTFf5P4mWeSl0KDxnGOEDRJTVwg",
  authDomain: "hyphen-hacks-2019.firebaseapp.com",
  databaseURL: "https://hyphen-hacks-2019.firebaseio.com",
  projectId: "hyphen-hacks-2019",
  storageBucket: "hyphen-hacks-2019.appspot.com",
  messagingSenderId: "496171471834",
  appId: "1:496171471834:web:026e08d6288a9f6589e6e3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
