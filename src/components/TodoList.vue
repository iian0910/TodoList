<template>
    <div>
        <pre id="content"></pre>
    </div>
</template>

<script>
import firebase from 'firebase'
    
    export default {
        mounted() {
            firebase.database().ref('myName').set('Ian')
            const contentRef = firebase.database().ref('myName')
            contentRef.on('value', (snapshot) => {
                document.getElementById('content').textContent = snapshot.val()
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>