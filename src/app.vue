<template>
    <div>
       <div class="cover"></div>
       <Header></Header>
       <Todo></Todo>
       <Footer></Footer>
    </div>
</template>
<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'
export default {
   components: {
       Header,
       Footer,
       Todo
   }
}
</script>
<style lang="less" scoped>
    .cover{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }
</style>

