<template>
  <div class="login">
    <h3>Sign in</h3>
    <input type="text" v-model="email" v-on:keyup="loginEnter" placeholder="Email" />
    <br />
    <input type="password" v-model="password" v-on:keyup="loginEnter" placeholder="Password" />
    <br />
    <button @click="loginClick">Log In</button>
    <br />
    <button @click="googleLogin">Sign in With Google</button>
    <p>
      Don't have an account?
      <router-link to="/sign-up">Sign up</router-link>
    </p>

    
  </div>
</template>


<script>
import firebase from "firebase";

var provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginClick: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            // alert("You are signed in!");
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    loginEnter: function(e) {
      if (e.keyCode === 13) {
        // alert("Enter was pressed");
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              // alert("You are signed in!");
              this.$router.replace("home");
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      }
    },
    googleLogin: function() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          () => {
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
