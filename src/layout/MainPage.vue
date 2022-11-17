<template>
    <div class="main-page">
        <div class="bar">
            <slot name="bar"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-page {
    flex: auto;
    display: flex;
    flex-direction: column;
    > .bar {
        flex: none;
        position: sticky;
        top: 0;
        z-index: 10;
        background: #fff;
    }
    > .content {
        // flex: auto;
        // height: 0;
    }
}
</style>