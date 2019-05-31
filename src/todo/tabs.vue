<template>
    <div class="helper">
        <span class="left">{{unfinishedTodoLength}} items left</span>
        <span class="tabs">
           <em 
           v-for="state in states" 
           :key="state" 
           :class="[state, filter === state ? 'actived' : '']"
           @click="toggleFilter(state)"
           >
                {{state}}
           </em>
        </span>
        <span class="clear" @click="clearAllcompleted()">clear Completed</span>
    </div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    computed: {
        unfinishedTodoLength() {
            return this.todos.filter(todo => !todo.completed).length
        }
    },
    data(){
        return{
            states: ['all', 'active', 'completed']
        }
    },
    methods:{
        toggleFilter(state){
            this.$emit('toggle', state)
        },
        clearAllcompleted(){
            this.$emit('clearAllCompleted')
        }
    }
}
</script>
<style lang="less" scoped>
    .helper{
        background: #fff;
        width: 100%;
        height: 30px;
        padding-top: 10px ;
        span{
            cursor: pointer;
        }
        em{
            cursor: pointer;
            font-style: normal;
            padding: 6px;
            &.actived{
                border: 1px solid #f45353;
                border-radius: 3px;
            }
        }
        .left{
            float: left;
            padding-left: 30px;
        }
        .clear{
            float: right;
            padding-right: 30px;
        }
        .tabs{
            margin-left: 50px;
            float: left;
        }
    }
</style>
