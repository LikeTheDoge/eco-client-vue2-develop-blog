<template>
    <div class="app-user-info">
        <div class="app-user-avatar">
        </div>
        <div class="app-user-name">
            <div class="nickname">赵伯叔</div>
            <div class="realname">like_the_doge</div>
        </div>
        <div class="app-user-action">
            <button class="e-btn link">
                <e-icon family="i_base" name="logout-variant" :size="18"></e-icon>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app-user-info{
    height: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .app-user-avatar{
        height: 48px;
        width: 48px;
        border-radius: 50%;
        background: #66ccff;
        margin: 0 12px;
        flex: none;
    }
    .app-user-name{
        flex:auto;
        > .nickname{
            font-size: 14px;
            font-weight: bolder;
        } 
    }
    .app-user-action{
        padding: 12px;
        margin-right: 12px;
    }
}

</style>

<script>
export default {};
</script>