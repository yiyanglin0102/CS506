import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import "bootstrap"


Vue.config.productionTip = false

let app = '';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG9rxuCWKPHK1lGp-S3sbTWAEsvYdnC2I",
  authDomain: "yiyang-test.firebaseapp.com",
  databaseURL: "https://yiyang-test.firebaseio.com",
  projectId: "yiyang-test",
  storageBucket: "yiyang-test.appspot.com",
  messagingSenderId: "482725982187",
  appId: "1:482725982187:web:615a3dd58fcc3c3f49f3ae",
  measurementId: "G-DSDXK871H7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});