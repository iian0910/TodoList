<template>
    <div>
        <div class="todoList">
            <div class="todoList_head">
                <div class="row">
                    <div class="col-9">
                        <input
                            id="input-content"
                            type="text"
                            placeholder="今天有甚麼待辦的呢..."
                            @keyup.enter="send()"
                        >
                    </div>
                    <div class="col-3">
                        <div
                            id="send-btn"
                            class="button"
                            @click="send()"
                        >送出</div>
                    </div>
                </div>
                
            </div>
            <div class="todoList_body">
                <ul id="list"></ul>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
    
export default {
    data(){
        return {
            cleanData: false
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

            document.getElementById('input-content').value = ''
            document.getElementById('input-content').focus()

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
                                class="todo"
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

<style lang="scss">
.todoList {
    width: 450px;
    height: 600px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: rgba(9, 132, 116, 0.5) 0 15px 15px -5px, rgba(9, 132, 116, 0.5) 0 15px 15px -5px;
    overflow: hidden;
    @media screen and (max-width: 760px) {
        width: calc(100% - 10%);
        height: 550px;
    }
    .todoList_head {
        padding: 30px;
        background-color: #0096C7;
    }
}

#input-content {
    padding: 10px;
    border: none;
    background-color: rgba(255,255,255,0.25);
    width: 100%;
    font-size: 20px;
    color: white;
    outline: none;
}

::placeholder {
    color: rgba(255,255,255,0.5);
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: red;
}
::-ms-input-placeholder { /* Microsoft Edge */
 color: red;
}

.button {
    width: 100%;
    height: 100%;
    background-color: #023E8A;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(#023E8A, 0.5);
    }
}

.todoList_body {
    padding: 20px;
    width: 100%;
    height: calc(100% - 109px);
    overflow-y: auto;
}

.todo {
    padding: 5px 0;
    color: #333;
    font-size: 20px;
    line-height: 1.5;
    cursor: pointer;
    border-bottom: 1px solid #ade8f4;
}
</style>