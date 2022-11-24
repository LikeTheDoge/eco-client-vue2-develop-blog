<template>
  <a-form-model style="overflow:hidden" ref="createFolderForm" :model="form" :rules="{ value: rules }">
    <a-form-model-item prop="value">
      <a-input :placeholder="placeholder" v-model="form.value">
        <template #suffix>
          <div class="enter-btn" @click="inputSubmit">
            <e-icon family="i_base" name="done"></e-icon>
          </div>
        </template>
      </a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  props: {
    placeholder: { default: "" },
    value: { default: "" },
    submit: { default: () => () => {} },
    rules: [],
  },

  data() {
    return {
      form: {
        value: "",
      },
    };
  },

  mounted() {
    this.form.value = this.value;
  },

  watch: {
    value() {
      this.form.value = this.value;
    },
  },

  methods: {
    $$reset(value) {
      if (value === undefined) this.form.value = this.value;
      else this.form.value = value;

      this.$refs.createFolderForm.clearValidate();
    },

    $$validate(){
      return this.$refs.createFolderForm.validate()
    },

    $$value(){
      return this.form.value
    },

    async inputSubmit() {
      const res = await this.$$validate();
      if (!res) return;
      await this.submit(this.$$value());
      this.$$reset();
      this.$emit("success");
    },
  },
};
</script>

<style lang="scss" scoped>
.enter-btn {
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>