<template>
    <section class="real-app">
        <input
         type="text"
         class="add-input"
         autofocus="autofocus"
         placeholder="todo"
         @keyup.enter="addTodo"
         >
         <Item 
         :todo="todo"
         v-for="todo in filteredTodos"
         :key= "todo.id"
         @del="deleteTodo"
         />
         <Tabs 
         :filter="filter" 
         :todos="todos"
         @toggle="toggleFilter"
         @clearAllCompleted="clearAllCompleted"
         />
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id =0;
export default {
    
    data(){
        return{
            todos:[],
            filter: 'all'
        }
    },
    computed: {
        filteredTodos(){
            if(this.filter == 'all'){
                return this.todos
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => completed === todo.completed )
        }
    },
    components: {
        Item,
        Tabs
    },
    methods: {
        addTodo(e){
            if(e.target.value){
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = '';
            }
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        },
        toggleFilter(state) {
            this.filter = state;
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
    
}
</script>
<style lang="less" scoped>
    .real-app{
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
    }
    .add-input{
        position: relative;
        margin: 0;
        background: #fff;
        width: 100%;
        font-size: 24px;
        line-height: 1.4em;
        border: none;
        outline: none;
        padding: 6px;
        padding-left: 40px;
        box-sizing: border-box;
    }
</style>