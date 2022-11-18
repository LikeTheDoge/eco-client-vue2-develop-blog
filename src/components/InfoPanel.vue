<template>
    <div :class="{ 'info-panel': true, show: !hidden}">
        <div class="info-panel-inner">
            <FileRecords :info="null" />
        </div>
    </div>
</template>


<script>
import FileRecords from "./info/record/FileRecords.vue";
import { pageEvent } from "../eventbus/page";

export default {
    components: {
        FileRecords,
    },
    data() {
        return {
            states: [],
            hidden: false,
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
        pageEvent.$on("update", (page) => (this.hidden = !page));
        
        pageEvent.$on('focusContent',()=>{
            this.hidden = true
        })
        pageEvent.$on('showSider',()=>{
            this.hidden = false
        })
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
    transition: all 0.6s ease;
    &.show {
        border-left: 2px solid var(--theme-color-light);
        width: 320px;
    }

    > .info-panel-inner {
        width: 320px;
        height: 100%;
    }

    @media print {
        display: none;
    }
}
</style>