<template>
    <div
        class="record-user-avatar"
        :style="{ height:size+'px',width:size+'px', backgroundImage: `url(${url})` }"
    ></div>
</template>

<script>
export default {
    props: ["url",'size'],
};
</script>

<style lang="scss" scoped>
.record-user-avatar {
    height: 32px;
    width: 32px;
    display: inline-block;
    border-radius: 50%;
    background: #66ccff;
    margin-right: 4px;
    position: relative;
    background-size: cover;
    overflow: visible;
    background-position: center;
    flex: none;
}
</style>