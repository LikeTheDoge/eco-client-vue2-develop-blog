<template>
    <div :class="{'article-view':true,hidden}">
        <div
            class="markdown-article markdown-body"
            v-html="html"
        ></div>
    </div>
</template>

<script>
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { pageEvent } from "../eventbus/page";

export default {
    mounted() {
        pageEvent.$on("update", async (file) => {
            if (file) {
                this.hidden = false;
                const downloadUrl = file.downloadUrl;
                const markdown = await fetch(downloadUrl).then(response => response.text())
                this.load(markdown)
            } else {
                this.hidden = true;
                this.html = '';
            }
        });
    },

    methods: {
        async load(markdown) {
            const file = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(markdown);
            this.html = file.toString();
        },

    },

    data() {
        return {
            html: "",
            hidden: true,
        };
    },
};
</script>

<style lang="scss" scoped>
.article-view {
    transition: all 0.3s ease;
    &.hidden {
        opacity: 0;
        height: 0;
    }
}
.markdown-article {
    margin: 0 48px;
}
</style>
