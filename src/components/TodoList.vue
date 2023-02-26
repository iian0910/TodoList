<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="input-group mb-3">
                        <input
                            id="input-content"
                            type="text"
                            class="form-control"
                            placeholder="請輸入內容"
                        >
                        <div
                            class="input-group-append"
                        >
                            <button
                                id="send-btn"
                                class="btn btn-outline-secondary"
                                type="button"
                                @click="send()"
                            >
                                送出
                            </button>
                        </div>
                    </div>
                    <ul id="list"></ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
    
export default {
    data(){
        return {

        }
    },
    mounted() {
        this.showList()
        this.removeItem()
    },
    methods: {
        send() {
            const text = document.getElementById('input-content').value
            firebase.database().ref('todos').push({'content': text})

            this.showList()
        },
        showList() {
            const listDataRef = firebase.database().ref('todos')
            listDataRef.on('value', (snapshot) => {
                let str = ''
                const snapshotData = snapshot.val()
                const list = document.getElementById('list')
    
                for(var item in snapshotData) {
                    str += `<li
                                style="padding: 10px 0"
                                data-key="${item}"
                            >
                                ${snapshotData[item].content}
                            </li>`
                }

                list.innerHTML = str
            })
        },
        removeItem() {
            const list = document.getElementById('list')
            list.addEventListener('click', function(e){
                if(e.target.nodeName === 'LI') {
                    let todosRef = firebase.database().ref('todos')
                    let key = e.target.dataset.key
                    todosRef.child(key).remove()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>