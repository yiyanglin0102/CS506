  
<template>
  <span class="border border-primary">
    <div class="hi">
      <h1 class="p-3 mb-2 bg-info text-white">
        <p>Welcome to My Bulletin Board</p>
      </h1>
      <router-link class="badge badge-primary text-wrap" style="width: 6rem;" to="/Login">Login</router-link>
      <button @click="logout" class="badge badge-primary text-wrap" style="width: 6rem;">Logout</button>

      <br />
      <router-link to="/home">Back to Personal Profile</router-link>
      <br />

      <table class="table table-hover table-dark" >
        <thead>
          <tr>
            <th scope="col" >First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
             <th scope="col">Future Goals</th>
                          <th scope="col">Classes</th>

            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.firstName">
            <td width="10%">
              <span v-text="item.firstName"></span>
            </td>
            <td width="10%">
              <span v-text="item.lastName"></span>
            </td>
            <td width="10%">
              <span v-text="item.email"></span>
            </td>
              <td width="10%">
              <span v-text="item.futureGoals"></span>
            </td>
            <td width="20%">
              <span v-text="item.myClasses"></span>
            </td>
            <td width="30%">
              <span v-text="item.wantSay"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>


<script>
import firebase from "firebase";
export default {
  name: "home",
  data() {
    return {
      items: [],
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
    print: function() {
      var vm = this;
      // `${doc.id} => ${doc.data().email}`
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.data().name);
            vm.firstName = doc.data().firstName;
            vm.lastName = doc.data().lastName;
            vm.email = doc.data().email;
            vm.wantSay = doc.data().wantSay;
            vm.myClasses = doc.data().myClasses;
            vm.futureGoals = doc.data().futureGoals;
            vm.interestingLinks = doc.data().interestingLinks;

            // console.log(`${doc.id} => ${doc.data().wantSay}`);
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
          } else {
            console.log("找不到文件");
          }
        })
        .catch(function(error) {
          console.log("提取文件時出錯:", error);
        });
    },
    fetchChatHistory() {
      var vm = this;
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().wantSay != "") {
              vm.items.push(doc.data());
              vm.items.sort();
            }
          });
        });
    }
  },
  created() {
    this.print();
    this.fetchChatHistory();
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
}
.border {
  border-style: dotted;
  border-color: red;
}
</style>

