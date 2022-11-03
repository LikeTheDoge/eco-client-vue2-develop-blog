<template>
  <div class="triggle-change" ref="cntr">
    <div
      :class="{ content: true, 'content-false': true, show: !state }"
      ref="content_false"
    >
      <slot name="false"></slot>
    </div>
    <div
      ref="content_true"
      :class="{ content: true, 'content-true': true, show: state }"
    >
      <slot name="true"></slot>
    </div>
  </div>
</template>

<script>
// const timeout = (timeout) =>
//   new Promise((res) => {
//     setTimeout(() => {
//       res();
//     }, timeout);
//   });

export default {
  props: {
    state: { default: false },
  },
  watch: {
    async state(newVal, oldVal) {
      if (!(newVal || oldVal)) return;
      if (newVal && oldVal) return;

      const cntr = this.$refs.cntr;

      if (newVal) {
        const { height: btnHeight } =
          this.$refs.content_false.getBoundingClientRect();
        cntr.style.height = `${btnHeight}px`;

        await this.$nextTick();

        const { height: detailHeight } =
          this.$refs.content_true.getBoundingClientRect();
        cntr.style.height = `${detailHeight}px`;
        console.log(detailHeight)

        setTimeout(() => {
          cntr.style.height = "";
        }, 300);
      } else {
        const { height: detailHeight } =
          this.$refs.content_true.getBoundingClientRect();
        cntr.style.height = `${detailHeight}px`;

        await this.$nextTick();

        const { height: btnHeight } =
          this.$refs.content_false.getBoundingClientRect();
        cntr.style.height = `${btnHeight}px`;

        setTimeout(() => {
          cntr.style.height = "";
        }, 300);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.triggle-change {
  transition: all 0.3s ease;
  position: relative;
  .content {
    transition: all 0.3s ease;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    &.show {
      position: relative;
      z-index: 1;
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>