<template>
    <div class="sider-menu">
        <CommentInput
            class="comment-input"
            type=""
            dataId=""
            jumpUrl=""
            pageName=""
            :createComment="createComment"
        />
    </div>
</template>

<script>
import { CommentInputWithAt } from "../models/Comment";
export default {
    data() {
        return {
            createComment: (obj) =>
                Object.assign(new CommentInputWithAt(), obj),
            projects: [],
        };
    },
};
</script>

<style lang="scss" scoped>
.sider-menu {
    flex: auto;
    display: flex;
    flex-direction: column;
    max-height: 780px;

    > div {
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    }
    
    .comment-input{
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 12px;
        margin: 0 24px 0 12px;
        &.hide{
            background: #eee;
            border: 1px solid #fff;
        }
    }
}
</style>