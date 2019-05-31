<template>
    <div :class="['todo-item', todo.completed ? 'completed':'']">
        <input 
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
        >
        <label for="">{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>
<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods:{
        deleteTodo(){
            this.$emit('del', this.todo.id)
        }
    }
}
</script>
<style lang="less" scoped>
.todo-item{
    position: relative;
    background: #fff;
    font-size: 24px;
    padding-left: 40px;
    color: #666;
    &:hover{
        .destory:after{
            content: 'x'
        }
    }
    .toggle{
        width: 20px;
        height: 20px;
        webkit-appearance: none;
        background: none;  
        vertical-align: middle;
        background-image: url(../assets/images/button.png);
        background-size: 100%; 
        border: none;
        outline: none;
        
    }
    label{
        padding: 15px 60px 15px 15px; 
        line-height: 40px;
        transition: color 0.4s;
    }
    .destory{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin:  auto 0;
        color: #f45353;
        font-size: 24px;
        border: none;
        background: none;
        outline: none;
    }
    &.completed{
        label{
            color: #d9d9d9;
            text-decoration: line-through;
        }
        .toggle{
            background-image: url(../assets/images/button1.png)
        }
    }
    
}
    
    
</style>
