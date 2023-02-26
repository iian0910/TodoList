<template>
  <div class="hello">
    <pre id="content"></pre>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    firebase.database().ref('myName').set('Ian')
    const contentRef = firebase.database().ref('myName')
    contentRef.on('value', (snapshot) => {
      document.getElementById('content').textContent = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
