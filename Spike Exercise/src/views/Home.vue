  
<template>
  <div class="home">
    <h3>Welcome to My Person Profile</h3>

    <!-- <br />
    <button v-on:click="storeData">STORE</button>
    <br />
    <button v-on:click="print">print</button>
    <br />-->
    <h4>About Me</h4>

    <span>First Name: {{ this.firstName }}</span>
    <br />
    <span>Last Name: {{ this.lastName }}</span>
    <br />
    <span>User email: {{ this.email }}</span>
    <br />
    <span>My Classes: {{ this.myClasses }}</span>
    <br />
    <span>My Future Goals: {{ this.futureGoals }}</span>
    <br />
    <span>My Interesting Links: {{ this.interestingLinks }}</span>
    <br />
    <span>I Want to Say: {{ this.wantSay }}</span>
    <br />
    <br />
    <br />
    <!-- <input type="name" v-model="name" placeholder="Name" />
    <br />-->
    <button @click="save" class="btn btn-info">save</button>
    <br />
    <br />
    <br />
    <router-link to="/hi">Back to Bulletin Board</router-link>
    <br />
    <button @click="logout" class="btn btn-info">Logout</button>
  </div>
</template>

<script>
import firebase from "firebase";
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  data() {
    return {
      email: "",
      // password: "",
      firstName: "",
      lastName: "",
      wantSay: "",
      myClasses: "",
      futureGoals: "",
      interestingLinks: ""
    };
  },
  methods: {
    save: function() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name,
          email: this.email
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    storeData: function() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: "Lovelace",
          born: 1815
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    print: function() {
      var vm = this;
      const currentUser = firebase.auth().currentUser;
      // `${doc.id} => ${doc.data().email}`
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().email == currentUser.email) {
              // console.log(doc.data().name);
              vm.firstName = doc.data().firstName;
              vm.lastName = doc.data().lastName;
              vm.email = doc.data().email;
              vm.wantSay = doc.data().wantSay;
              vm.myClasses = doc.data().myClasses;
              vm.futureGoals = doc.data().futureGoals;
              vm.interestingLinks = doc.data().interestingLinks;
            }
            console.log(`${doc.id} => ${doc.data().email}`);
          });
        });
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    getdata: function() {
      var docRef = firebase
        .firestore()
        .collection("users")
        .doc("gqPLrzAvZjwJYjFIMCzv");
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            return doc.data().email;
            // console.log(doc.data().email); //////////////////////////////////////////
          } else {
            console.log("找不到文件");
          }
        })
        .catch(function(error) {
          console.log("提取文件時出錯:", error);
        });
    }
  },
  created() {
    this.print();
  }
};
</script>

<style scoped>
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
  padding: 5px;
  width: 30%;

  /* border: solid #5B6DCD 10px;  */
}
</style>
