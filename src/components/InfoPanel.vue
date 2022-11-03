<template>
    <div :class="{ 'info-panel': true, show: !!current}">
        <div class="info-panel-inner">
            <FileRecords :info="null" />
        </div>
    </div>
</template>


<script>

import FileRecords from "./info/record/FileRecords.vue";

export default {
    components: {
        FileRecords
    },
    data() {
        return {
            states: [],
            current: null,
            createComment: (obj) =>
                Object.assign(new CommentInputWithAt(), obj),
        };
    },
    methods: {
        $$load(list) {
            this.states = list;
        },
    },
    mounted() {
        document.body.addEventListener("dblclick", () => {
            this.current = !this.current;
        });
    },
};
</script>


<style  lang="scss" scoped>
.info-panel {
    border-left: 1px solid transparent;
    height: 100%;
    width: 0;
    overflow: hidden;
    padding-top: 54px;
    transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    &.show {
        border-left: 1px solid var(--theme-color-light);
        width: 320px;
    }

    > .info-panel-inner {
        width: 320px;
        height: 100%;
    }
}
</style>