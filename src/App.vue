<template>
    <main id="app">
        <SiderBar />
        <MainPage>
            <TopBar slot="bar" />
            <router-view
                slot="content"
            ></router-view>
        </MainPage>
        <CurrentInfo />
    </main>
</template>

<script>
import SiderBar from "./layout/SiderBar.vue";
import MainPage from "./layout/MainPage.vue";
import TopBar from "./layout/TopBar.vue";
import CurrentInfo from "./layout/CurrentInfo.vue";

export default {
    components: { SiderBar, CurrentInfo, TopBar, MainPage },
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