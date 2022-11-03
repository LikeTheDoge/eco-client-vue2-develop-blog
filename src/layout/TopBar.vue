<template>
    <div class="top-header">
        <div class="top-header-title">
            {{title}}
        </div>
        <GlobalSearch />
    </div>
</template>

<script>
import GlobalSearch from "../components/GlobalSearch.vue";
import { titleEvent } from "../eventbus/title";
export default {
    data() {
        return { title: "" };
    },
    mounted() {
        titleEvent.$on("update", (title) => (this.title = title));
    },
    components: { GlobalSearch },
};
</script>

<style lang="scss" scoped>
.top-header {
    margin-top: 54px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    padding: 0 48px;

    .top-header-title {
        font-size: 22px;
        font-weight: bolder;
        flex: auto;
    }
    .top-header-search {
        width: 200px;
        flex: none;
    }
}
</style>