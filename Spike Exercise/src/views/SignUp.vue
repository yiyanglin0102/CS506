<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-6">
        <div class="sign-up">
          <p class="spinner-grow" role="status"></p>
          <p>Let's create your account!</p>

          <input type="text" class="form-control" v-model="email" placeholder="Email" />
          <br />
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
          <br />
          <input type="firstName" class="form-control" v-model="firstName" placeholder="First Name" />
          <br />
          <input type="lastName" class="form-control" v-model="lastName" placeholder="Last Name" />
          <br />

          <input type="myClasses" class="form-control" v-model="myClasses" placeholder="My Classes" />
          <br />

          <input
            type="futureGoals"
            class="form-control"
            v-model="futureGoals"
            placeholder="Future Goals"
          />
          <br />
          <input
            type="interestingLinks"
            class="form-control"
            v-model="interestingLinks"
            placeholder="My Interesting Links"
          />
          <br />

          <input
            type="wantSay"
            class="form-control"
            v-model="wantSay"
            placeholder="Something Want to Say"
          />
          <br />
          <button @click="signUp" class="btn btn-primary">Sign up</button>
          <br />
          <h4>
            <span class="btn btn-light">
              Or go back to
              <router-link to="/login" class="badge badge-warning">login</router-link>
            </span>
          </h4>

          <div class="col-sm-4"></div>
        </div>
      </div>
    </div>
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
      firstName: "",
      lastName: "",
      wantSay: "",
      myClasses: "",
      futureGoals: "",
      interestingLinks: ""
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
                // password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                wantSay: this.wantSay,
                myClasses: this.myClasses,
                futureGoals: this.futureGoals,
                interestingLinks: this.interestingLinks
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
  width: 100%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
}
span {
  display: black;
  margin-top: 20px;
  font-size: 11px;
}
</style>
