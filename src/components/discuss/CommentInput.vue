<template>
    <div
        :class="['comment-input', stauts]"
        :style="{ height: 157 + comment.files.length * 28 + 'px' }"
        @click="focus"
    >
        <at-select-panel
            ref="at"
            :searchKey="searchKey"
            :searchAt="searchAt"
            @submit="({ target, user }) => updateUser(target, user)"
        ></at-select-panel>
        <flex-col class="comment-input-inner">
            <flex-fill style="position: relative">
                <div
                    class="textarea_copy"
                    ref="textarea_copy"
                >
                    {{ comment.content }}
                </div>
                <textarea
                    ref="textarea"
                    v-model="comment.content"
                    class="textarea"
                    placeholder="发表评论（Ctrl+Enter发送）"
                    @focus="focus"
                    @keyup.ctrl.enter="handelSubmit"
                    @keydown.up="handelUp"
                    @keydown.down="handelDown"
                    @keydown.enter="handelEnter"
                    @keydown.esc="handelEsc"
                    :rows="4"
                />
            </flex-fill>
            <flex-fixed>
                <upload-list
                    ref="uploadList"
                    :dataId="comment.cid"
                    :list.sync="comment.files"
                    :uploadFile="uploadFile"
                ></upload-list>
            </flex-fixed>
            <flex-fixed>
                <upload-btn @upload="(f) => upload(f)"></upload-btn>
                <at-btn @at="() => createAt()"></at-btn>
                <a-button
                    type="primary"
                    class="send-btn"
                    :loading="loading"
                    @click="handelSubmit"
                >
                    发送
                </a-button>
            </flex-fixed>
        </flex-col>
    </div>
</template>

<script>
import { TextareaWithAt } from "./at/at";
import AtSelectPanel from "./at/AtSelectPanel.vue";
import AtBtn from "./at/AtBtn";
import UploadList from "./file/UploadList";
import UploadBtn from "./file/UploadBtn";

export default {
    components: { AtSelectPanel, UploadList, UploadBtn, AtBtn },
    props: {
        send: {
            default: () => () => undefined,
        },
        createComment: {
            default: () => () => ({}),
        },
        uploadFile: {
            default: () => undefined,
        },
        searchAt: {
            default: () => () => Promise.resolve([]),
        },
        jumpUrl: { required: true },
        pageName: { required: true },
        type: { required: true },
        dataId: { required: true },
    },
    data() {
        return {
            stauts: "hide",
            loading: false,
            fileList: [],
            at: new TextareaWithAt(),
            comment: this.createComment({
                type: this.type,
                dataId: this.dataId,
                jumpUrl: this.jumpUrl,
                pageName: this.pageName,
            }),
            searchKey:
                this.$route.params.type === "products"
                    ? "info-system-discuss"
                    : "info-solution-discuss",
        };
    },
    mounted() {
        this.at.install(this.$refs.textarea, this.$refs.textarea_copy);
        this.at.onhit = (target, pos) => {
            this.filterUsers();
            this.$refs.at.$$open(target, pos);
        };
        this.at.unhit = () => {
            this.filterUsers();
            this.$refs.at.$$close();
        };
        this.$refs.textarea.addEventListener("paste", (event) => {
            // addEventListener：添加粘贴事件监听
            const imagesFile = event.clipboardData.files[0]; // 获取剪贴板图片
            if (!imagesFile) {
                return;
            }
            this.$refs.uploadList.$$upload(imagesFile);
        });

        this.$blur = () => {
            this.blur();
            this.$refs.at.$$close();
        };
        document.addEventListener("click", this.$blur);
    },
    destroyed() {
        document.removeEventListener("click", this.$blur);
    },
    methods: {
        focus(e) {
            this.stauts = "show";
            if (e) e.stopPropagation();
        },
        blur() {
            this.stauts = "hide";
            this.$refs.textarea.blur();
            this.$refs.textarea.scrollTo({ top: 0 });
        },
        upload(f) {
            this.$refs.uploadList.$$upload(f);
        },
        async createAt() {
            this.$refs.textarea.setSelectionRange(
                this.$refs.textarea.selectionStart,
                this.$refs.textarea.selectionStart
            );

            if (!this.at.createAt()) {
                const sIdx = this.$refs.textarea.selectionStart;
                const content = this.comment.content;
                this.comment.content =
                    content.substring(0, sIdx) + "@ " + content.substring(sIdx);
                await this.$nextTick();
                this.$refs.textarea.focus();
                this.$refs.textarea.setSelectionRange(sIdx + 1, sIdx + 1);
                this.at.createAt();
            }
        },
        handelUp(e) {
            if (this.$refs.at.$$isOpen()) {
                this.$refs.at.$$above();
                e.preventDefault();
                return false;
            }
        },
        handelDown(e) {
            if (this.$refs.at.$$isOpen()) {
                this.$refs.at.$$next();
                e.preventDefault();
                return false;
            }
        },
        updateUser(target, user) {
            // const name = user.nickname
            const content = this.comment.content;
            const str1 = content.substring(0, target.begin + 1);
            const str2 = content.substring(target.begin + 1, target.end + 1);
            const str3 = content.substring(target.end + 1);

            if (str2 === target.text) {
                this.comment.atUsers.push(user);
                this.comment.content = str1 + user.username + " " + str3;
                this.$nextTick().then(() => {
                    const e = str1 + user.username;
                    this.$refs.textarea.setSelectionRange(
                        e.length + 2,
                        e.length + 2
                    );
                });
            }
        },
        filterUsers() {
            this.comment.atUsers = this.at.filterUsers(this.comment.atUsers);
        },

        handelEnter(e) {
            if (this.$refs.at.$$isOpen()) {
                this.$refs.at.$$enter();
                e.preventDefault();
                return false;
            }
        },
        handelEsc(e) {
            if (this.$refs.at.$$isOpen()) {
                this.$refs.at.$$esc();
                e.preventDefault();
                return false;
            }
        },
        handelSubmit() {
            if (this.loading) return;
            if (!this.comment.content && !this.comment.files.length) {
                this.$message.warning("请输入回复内容！");
                return;
            }

            if (this.comment.content.length > 1000) {
                this.$message.warning("回复长度应小于 1000 个字！");
                return;
            }
            if (!this.comment.content) {
                this.comment.content = this.comment.files
                    .map((v) => v.file.fileName)
                    .join(",");
            }
            // CommentInput.valid(this.comment).then(() => {
            this.loading = true;
            this.submit(this.comment);
            // })
        },
        submit(comment) {
            (this.send ? this.send(comment) : Promise.resolve(""))
                .then(() => {
                    this.comment = this.createComment({
                        type: this.type,
                        dataId: this.dataId,
                        jumpUrl: this.jumpUrl,
                        pageName: this.pageName,
                    });
                    this.$emit("done");
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        $$reply(comment) {
            setTimeout(() => {
                this.$refs.textarea.focus();
                this.focus();
                this.$refs.textarea.selectionStart =
                    this.$refs.textarea.selectionEnd =
                        this.$refs.textarea.value.length;
            });
            this.comment = this.createComment({
                type: this.type,
                dataId: this.dataId,
                jumpUrl: this.jumpUrl,
                pageName: this.pageName,
            });
            this.comment.content = `回复 @${comment.user.username} ： `;
            this.comment.atUsers = [comment.user];
        },
    },
    watch: {
        stauts() {
            this.$emit("status", this.stauts);
        },
    },
};
</script>

<style lang="scss" scoped>
.comment-input {
    border-top: 1px solid #dfe0e5;
    overflow: hidden;
    padding-top: 8px;
    transition: all 0.3s ease;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        background: transparent;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
    }

    &.hide::after {
        height: 8px;
    }

    &.hide {
        height: 48px !important;
        padding-top: 8px;
        padding-bottom: 12px;

        .textarea {
            overflow: hidden;
        }
    }

    &.show {
        height: 157px;
    }

    .comment-input-inner {
        height: 128px;
    }
    .textarea {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        padding: 4px 12px;
        height: 100%;
        width: 100%;
        z-index: 1;
        resize: none;
        opacity: 1;
        overflow-y: auto;
        display: block;
        background: transparent;

        word-break: break-word;
        white-space: pre-wrap;
    }
    .textarea_copy {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        padding: 4px 12px;
        height: 100%;
        top: 0;
        overflow-y: auto;
        width: 100%;
        position: absolute;
        z-index: -1;
        resize: none;
        opacity: 0;
        color: green;
        display: block;
        transform: translateY(-4px);
        word-break: break-word;
        white-space: pre-wrap;
    }
    .send-btn {
        float: right;
        margin: 10px;
        margin-top: 12px;
    }
}
</style>