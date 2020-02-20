<template>
  <div class="sign-up">
    <p>Let's create your account!</p>
    <input type="text" v-model="email" placeholder="Email" />
    <br />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <input type="name" v-model="name" placeholder="First Name, Last Name" />
    <br />
    <button @click="signUp">Sign up</button>
    <br />
    <span>
      Or go back to
      <router-link to="/login">login</router-link>
    </span>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      name: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            // alert("Your account has been successfully created!!");
            firebase
              .firestore()
              .collection("users")
              .add({
                email: this.email,
                password: this.password,
                name: this.name
              })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });

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
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: black;
  margin-top: 20px;
  font-size: 11px;
}
</style>
