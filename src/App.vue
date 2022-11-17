<template>
    <main
        id="app"
        v-show="loaded"
    >
        <SiderBar />
        <MainPage>
            <TopBar slot="bar" />
            <!-- <router-view ></router-view> -->
            <template slot="content">
                <HomePage />
                <ArticelContent />
            </template>
        </MainPage>
        <CurrentInfo />
    </main>
</template>

<script>
import SiderBar from "./layout/SiderBar.vue";
import MainPage from "./layout/MainPage.vue";
import TopBar from "./layout/TopBar.vue";
import CurrentInfo from "./layout/CurrentInfo.vue";
import HomePage from "./layout/HomePage.vue";
import ArticelContent from "./layout/AritcleConent.vue";
import { pageEvent } from "./eventbus/page";
import { getArticleFile } from "./requests/aritcle";

export default {
    components: {
        SiderBar,
        CurrentInfo,
        TopBar,
        MainPage,
        HomePage,
        ArticelContent,
    },
    computed: {
        post() {
            const path = this.$route.path;
            if (path.indexOf("/post") === 0) return path.replace("/post", "");
            else return null;
        },
    },
    data() {
        return { loaded: false, focusContent: false };
    },
    watch: {
        async post() {
            this.reflash();
        },
    },
    methods: {
        async reflash() {
            if (this.post) {
                const file = await getArticleFile();
                console.log(file);
                pageEvent.$emit("update", file);
                this.loaded = true;
                this.focusContent = false
            } else {
                pageEvent.$emit("update", null);
                this.loaded = true;
                this.focusContent = false
            }
        },
    },
    mounted() {
        this.reflash();
        document.body.ondblclick=()=>{
            if(!this.post) return
            if(this.focusContent) pageEvent.$emit('showSider')
            if(!this.focusContent) pageEvent.$emit('focusContent')
            this.focusContent = !this.focusContent

        }
    },
};
</script>

<style scoped>
#app {
    max-width: 1504px;
    display: flex;
    margin: 0 auto;
}
</style>

<style>
html,
body {
    margin: 0;
}

* {
    box-sizing: border-box;
}
:root {
    --header-height: 72px;
    --sidebar-width: 280px;
    --theme-color: #66ccff;
    --theme-color-r: 102;
    --theme-color-g: 204;
    --theme-color-b: 255;
    --theme-color-light: rgba(0, 0, 0, 0.04);
    --color-gray: #888888;
    --color-gray-light: #cccccc;
}
</style>