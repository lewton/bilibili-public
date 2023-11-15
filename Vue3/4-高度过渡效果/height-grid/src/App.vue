<script setup>
import { ref } from "vue";
import TheWelcome from "./components/TheWelcome.vue";

const show = ref(true);
const toggle = () => {
  show.value = !show.value;
};
</script>

<template>
  <main>
    <div><button @click="toggle">切换</button></div>
    <transition name="show" appear>
      <div v-show="show" class="wrap">
        <div class="box">
          <TheWelcome />
        </div>
      </div>
    </transition>
    其他内容
  </main>
</template>

<style scoped>
.box {
  overflow: hidden;
  background-color: green;
  color: white;
  align-self: start;
}

.wrap {
  display: grid;
  overflow: hidden;
  grid-template-rows: 1fr;
}

/* 显示的时候 0fr -> 1fr */
/* 过渡效果之前 .show-enter-from：瞬间会重置 0fr */
/* 会加上 .show-enter-active 的 transition 过渡 */
/* 实现了 0fr -> 1fr */

/* 隐藏的时候 1fr -> 0fr */
/* 会加上 .show-leave-active 的 transition 过渡 */
/* .show-leave-to : 0fr  */
/* 实现了 1fr -> 0fr -> display: none */
.show-enter-active,
.show-leave-active {
  transition: grid-template-rows 5s linear;
}

.show-enter-from,
.show-leave-to {
  grid-template-rows: 0fr;
}
</style>
