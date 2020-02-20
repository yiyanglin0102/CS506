  
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="logout">Logout</button><br>
    <button v-on:click="storeData">STORE</button> <br>
    <button v-on:click="print">print STORE</button><br>


    <input type="name" v-model="name" placeholder="Name" />
    <br />
<button @click="save">save</button>
    <br />
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
      name: ""
    };
  },
  methods: {
    save: function() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name
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
          first: "Ada",
          last: "Lovelace",
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
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data()}`);
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
    }
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

