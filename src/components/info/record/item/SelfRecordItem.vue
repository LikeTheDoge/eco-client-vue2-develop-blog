<template>
    <div :class="{'self-record-item':true, focus}">
        <div class="record-user-avatar"></div>
        <div class="record-info">
            <div class="nickname">赵伯叔 <span style="float:right;opacity:0.7">2022-3-21</span></div>
            <div
                class="content"
                :title="content"
            >
                {{content}}
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ["focus"],
    data() {
        return {
            content:
                "like_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_dogelike_the_doge",
        };
    },
};
</script>

<style lang="scss" scoped>
.self-record-item {
    height: 48px;
    display: flex;
    overflow: hidden;
    align-items: center;
    margin-bottom: 8px;
    transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    * {
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    }
    .record-user-avatar {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: #66ccff;
        margin: 2px 12px 0 0;
        flex: none;
    }
    .record-info {
        flex: auto;
        overflow: hidden;
        margin-right: 24px;

        > .nickname {
            font-size: 12px;
            font-weight: bolder;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100%;
        }

        > .content {
            font-size: 12px;
            height: 18px;
            width: 100%;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }
    .app-user-action {
        padding: 12px;
    }

    &.focus {
        height: 72px;
        > .record-user-avatar {
            height: 48px;
            width: 48px;
        }

        > .record-info {
            > .nickname {
                font-size: 14px;
            }
            > .content {
                height: 36px;
                -webkit-line-clamp: 2;
            }
        }
    }
}
</style>

