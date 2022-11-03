<template>
    <div :class="{'seach-input-control':true,active:!disabled}">

        <button class="search-btn e-btn link">
            <e-icon
                family="i_base"
                name="search"
            ></e-icon>
        </button>
        <input
            v-model="value"
            type="text"
            @focus="focus"
        >
    </div>
</template>

<script>
export default {
    props: {
        disabled: { default: false },
        isBlank: { default: false },
    },
    data() {
        return {
            value: "",
        };
    },
    watch: {
        value() {
            this.$emit("update:isBlank", this.value.trim() === "");
        },
    },
    methods: {
        focus() {
            if (this.disabled) this.$emit("focus");
        },
        $$clear(){
            this.value = ''
        }
    },
};
</script>

<style lang="scss" scoped>
.seach-input-control {
    height: 36px;
    position: relative;

    > .search-btn {
        height: 36px;
        width: 36px;
        top: 0;
        left: 0;
        font-size: 18px;
        pointer-events: none;
        position: absolute;
    }
    > input {
        padding: 0 18px 0 36px;
        display: block;
        border: none;
        width: 100%;
        height: 36px;
        background: transparent;
        outline: none !important;
        // opacity: 0;
    }

    &.active {
        > .search-btn {
            pointer-events: all;
            left: calc(100% - 36px);
        }
        > input {
            padding: 0 36px 0 18px;
        }
    }
}
</style>