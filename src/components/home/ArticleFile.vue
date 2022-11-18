<template>
    <div class="article-list-item">
        <div class="article-icon"></div>
        <div class="article-info">
            <div class="article-info-link">
                <router-link :to="`/post${file.path}`"><span
                        class="tag"
                        v-if="tag"
                    >{{tag}} :</span>{{title}}</router-link>
            </div>
            <div class="article-info-desc">
               <UserAvatar style="vertical-align:bottom" :size="18" :url="file.updateUserAvatar" /> {{file.updateUserName}}- <DateText :date="file.updateTime"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["file"],
    computed: {
        title() {
            const info = this.file;
            return (info.remark || "").split(" | ")[0] || "(暂无标题)";
        },
        tag() {
            const info = this.file;
            console.log(this.file)
            return (info.remark || "").split(" | ")[1] || "";
        },
    },
};
</script>

<style lang="scss" scoped>
.article-info-link {
    margin: 0 0 12px;
    font-size: 17px !important;
    line-height: 1.35 !important;
    font-weight: 700 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: all 0.3s ease;

    * {
        transition: all 0.3s ease;
    }

    > a {
        color: #333;
        cursor: pointer;
    }

    &:hover > a {
        color: #000000 !important;
        box-shadow: inset 0 -3px 0 0 #ef6421;
    }
    .tag {
        display: inline-block;
        margin: -2px 5px 0 0;
        padding: 0px;
        color: rgb(239, 100, 33);
        background-color: rgba(0, 0, 0, 0);
        font-size: 15px !important;
        line-height: 1.35 !important;
        font-weight: 700 !important;
    }
}
.article-info-desc {
    line-height: 1.4 !important;
    font-size: 12px;
}
</style>