<template>

    <nav :class="{sidebar:true,show:show}">
        <div>
            <UserInfo />
            <SiderMenu />
        </div>
    </nav>
</template>


<script>
import UserInfo from "../components/UserInfo.vue";
import SiderMenu from "../components/SiderMenu.vue";

export default {
    components: { UserInfo, SiderMenu },
    data() {
        return { show: false };
    },
    mounted() {
        document.body.ondblclick = () => {
            this.show = !this.show;
        };
    },
};
</script>

<style lang="scss" scoped>
nav.sidebar {
    border-right: 1px solid transparent;
    position: sticky;
    height: 100vh;
    flex: none;
    top: 0;
    overflow: auto;
    width: 0;
    padding: 54px 0;

    display: flex;
    flex-direction: column;

    transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: var(--color-gray-light);
    }

    > div {
        width: var(--sidebar-width);
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
        margin-left: calc(0px - var(--sidebar-width));
    }

    &.show {
        border-right: 1px solid var(--theme-color-light);
        width: var(--sidebar-width);
        > div {
            margin-left: 0px;
        }
    }
}
</style>
