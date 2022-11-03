<template>
    <div :class="{'search-option-panel':true,'open':isOpen}">
        <div
            class="explain-icon"
            @click="()=>isOpen=!isOpen"
        ></div>
    </div>
</template>


<script>
export default {
    data: () => {
        return {
            isOpen: false,
        };
    },
};
</script>


<style lang="scss" scoped>
.search-option-panel {
    flex: none;
    width: 0;
    margin-left: 0;
    background: #66ccff;
    border-radius: 18px;
    position: relative;

    > .explain-icon {
        height: 32px;
        width: 32px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        top: 8px;
        left: calc(-36px - 8px);
        cursor: pointer;
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    }

    &.open {
        width: 200px;
        margin-left: 16px;
        > .explain-icon {
            left: 8px;
        }
    }
}
</style>