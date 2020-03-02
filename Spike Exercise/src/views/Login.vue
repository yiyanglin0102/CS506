<template>
  <div class="container" >
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="login">
            <h3>Sign in</h3>
            <input type="text" v-model="email" v-on:keyup="loginEnter" placeholder="Email" />
            <br />
            <input
              type="password"
              v-model="password"
              v-on:keyup="loginEnter"
              placeholder="Password"
            />
            <br />
            <button @click="loginClick" class="btn btn-success">Log In</button>
            <br />
            <button type="button" class="btn btn-primary" @click="googleLogin">Sign in With Google</button>
            <p>
              Don't have an account?
              <router-link to="/sign-up">Sign up</router-link>
              <br />
              <router-link to="/hi">Back to Bulletin Board</router-link>
            </p>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
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
      password: "",
      username: ""
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
      var vm = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          () => {
            vm.email = firebase.auth().currentUser.email;
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );

      firebase
        .firestore()
        .collection("users")
        .add({
          email: firebase.auth().currentUser.email
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
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
  width: 80%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 80%;
  cursor: pointer;
}
</style>




