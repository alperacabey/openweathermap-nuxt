<template>
  <div
    class="default-layout"
    :class="$route.meta.pageClass"
  >
    <client-only>
      <notifications group="notification" position="bottom center" class="mb-4" />
    </client-only>
    <HeaderBar />
    <div class="content-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    HeaderBar: () =>
      import('@/components/layout/HeaderBar.vue')

  }
}
</script>

<style lang="scss">
.content-wrapper {
  height: calc(100vh - 80px);
}
</style>
