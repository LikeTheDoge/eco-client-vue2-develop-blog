<template>
    <div @click="clear" :class="{'seach-clear-btn':true,disabled:disabled,'isopen':isOpen}">
    </div>
</template>

<script>
export default {
    props: {
        disabled: { default: true },
        isOpen: { default: false },
    },
    data() {
        return {
            value: "",
        };
    },
    methods: {
        focus() {
            if (this.disabled) this.$emit("focus");
        },
        clear(){
            this.$emit('clear')
        }
    },
};
</script>

<style lang="scss" scoped>
.seach-clear-btn {
    height: 36px;
    width: 36px;
    flex: none;
    background: #66ccff;
    border-radius: 18px;
    margin-left: 8px;
    cursor: pointer;

    &.disabled{
        width: 0;
        margin-left: 0!important;
    }

    &.isopen {
        margin-left: 16px;
    }
}
</style>