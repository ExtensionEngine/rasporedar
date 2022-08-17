<script>
export default {
  props: {
    icon: { type: String, required: true },
  },
};
</script>

<template>
  <div class="link">
    <span class="icon-wrapper">
      <img class="icon" :src="icon" />
    </span>
    <span class="link-text">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  margin-left: 0.4rem;
  padding: 0.5rem 1rem;
}
.icon-wrapper {
  font-size: 3rem;
  color: var(--color-light);
  transition: 0.2s ease-in-out;
}
.icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}
.link-text {
  opacity: 1;
  color: var(--color-light);
  transition: opacity 0.3s ease-in-out;
}
.link-text:hover {
  color: var(--color-main);
}
.link:hover .link-text {
  color: var(--color-light);
}
.link:hover {
  background-color: var(--color-active);
}
</style>
