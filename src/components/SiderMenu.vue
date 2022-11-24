<template>

    <div class="sider-menu">
        <CommentInput
            class="comment-input"
            type=""
            dataId=""
            jumpUrl=""
            pageName=""
            :createComment="createComment"
            :uploadFile="uploadCommentFile"
            :searchAt="searchAt"
            :send="submitComment"
        />
    </div>
</template>

<script>
import { toJson } from "e-model";
import { searchAt, createComment } from "../models/atcomment";
import { uploadCommentFile } from "../requests/comment";
export default {
    data() {
        return {
            submitComment: (comment) =>
                Promise.resolve(console.log(toJson(comment))),
            createComment: (option) => createComment(option),
            uploadCommentFile: (file) => uploadCommentFile(file),
            searchAt: (text) => searchAt(text),
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

    .comment-input {
        background: #fff;
        border: 2px solid #333;
        border-radius: 12px;
        margin: 0 24px 0 12px;
        &.hide {
            background: #eee;
            border: 2px solid #fff;
        }
    }
}
</style>