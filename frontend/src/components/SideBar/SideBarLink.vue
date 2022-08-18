<script setup>
import { computed } from 'vue';
const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  isCollapsed: { type: Boolean, required: true },
});
const checkExpanded = computed(() => (props.isCollapsed ? 'item-text' : 'item-text-extended'));
</script>

<template>
  <router-link :to="{ name: props.to }" class="sidebar-item">
    <span class="item-icon-wrapper">
      <img class="item-icon" :src="props.icon" />
    </span>
    <span :class="checkExpanded">
      <slot />
    </span>
  </router-link>
</template>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  margin-left: 0.4rem;
  padding: 0.5rem 1rem;
}
.item-icon-wrapper {
  font-size: 3rem;
  color: var(--color-light);
  transition: 0.3s ease-in-out;
}
.item-icon {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
}
.item-text {
  opacity: 0;
  color: var(--color-light);
  transition: opacity 0.5s ease-in-out;
}
.item-text:hover {
  color: var(--color-main);
}
.sidebar-item:hover .item-text,
.sidebar-item:hover .item-text-extended {
  color: var(--color-light);
}
.sidebar-item:hover {
  background-color: var(--color-active);
}
.item-text-extended {
  opacity: 1;
  color: var(--color-light);
  transition: opacity 0.8s ease-in-out;
}
.item-text-extended:hover {
  color: var(--color-main);
}
.sidebar-item.router-link-exact-active {
  /* background-color: var(--color-darker); */
  border-right: 5px solid var(--color-main);
}
.sidebar-item.router-link-exact-active .link-text-extended {
  color: var(--color-main);
}
.sidebar-item.router-link-exact-inactive {
  background-color: var(--color-darker);
  border-right: 5px solid var(--color-main);
}
</style>
