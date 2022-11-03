<template>
  <div class="detail-title">
    <div v-if="back" class="action-icon back-icon" @click="back">
      <e-icon family="i_base" name="back" :size="20"></e-icon>
    </div>
    <div class="title-text">
      {{ title }}
    </div>
    <div v-if="submit" class="action-icon submit-icon" @click="submit">
      <e-icon family="i_base" name="done" :size="20"></e-icon>
    </div>
    <div v-if="close" class="action-icon close-icon" @click="close">
      <e-icon family="i_base" name="close" :size="20"></e-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    back: { default: null },
    close: { default: null },
    submit: { default: null },
    title: { default: "" },
  },
};
</script>

<style lang="scss" scoped>
.detail-title {
  display: flex;
  padding-top: 4px;
  margin-bottom: 4px;
  .action-icon {
    height: 36px;
    width: 30px;
    line-height: 39px;
    text-align: center;
    cursor: pointer;
    flex: none;
    margin-left: -8px;
    &:hover {
      transition: all 0.3s cubic-bezier(0.17, 0.67, 0.36, 0.99);
      color: #66ccff;
    }
  }
  .title-text {
    flex:auto;
    line-height: 36px;
    font-size: 16px;
    font-weight: bolder;
  }
}
</style>