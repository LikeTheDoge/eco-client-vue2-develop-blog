<template>
    <div :class="{'home-page':true,hidden}">
        <SlideShow />

        <div class="home-page-inner">

            <div
                class="article-list"
            >

                <div class="article-list-content">
                    <div class="article-list-items">
                        <ArticleFile v-for="file in (rootFiles  ||[])"  :key="file.fileId" :file="file"/>
                    </div>
                </div>
            </div>

            <div
                class="article-list"
                v-for="root in treeData.roots.reverse()"
                :key="root.folderId"
            >
                <div class="article-list-title">
                    <div class="title">{{title(root)}}</div>
                    <div class="name">{{root.name}}</div>
                    <div class="hr"></div>
                </div>

                <div class="article-list-content">
                    <div class="article-list-items">
                        <ArticleFile v-for="file in (treeData.childrenFiles.get(root.folderId)  ||[])"  :key="file.fileId" :file="file"/>
                    </div>
                </div>

                <div
                    class="article-list-content"
                    :key="sec.folderId"
                    v-for="sec in folders.filter(v=>v.parentId === root.folderId)"
                >
                    <div class="article-list-sub-title">{{title(sec)}}</div>
                    <div class="article-list-items">
                        <ArticleFile v-for="file in (treeData.childrenFiles.get(sec.folderId) ||[])"  :key="file.fileId" :file="file"/>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { pageEvent } from "../eventbus/page";
import SlideShow from "../components/home/SlideShow.vue";
import ArticleFile from '../components/home/ArticleFile'
import { getAllAritcleFileAndFolders } from "../requests/aritcle";

export default {
    components: {
        SlideShow,
        ArticleFile
    },
    data() {
        return {
            hidden: false,
            files: [],
            folders: [],
        };
    },

    computed: {
        rootFiles() {
            return this.files.filter((v) => !v.folderId);
        },
        treeData() {
            const folderTable = new Map();
            this.folders.forEach((folder) => {
                folderTable.set(folder.folderId, folder);
            });

            const roots = this.folders.filter((v) => !v.parentId);
            const rootIdSet = new Set(roots.map((v) => v.folderId));
            const rootKids = this.folders.filter(
                (v) => v.parentId && rootIdSet.has(v.parentId)
            );

            const keepIdSet = new Set(
                roots.concat(rootKids).map((v) => v.folderId)
            );

            const findKeepIdCache = new Map();

            const findKeepId = (folderId) => {
                if (keepIdSet.has(folderId)) return folderId;

                const cache = findKeepIdCache.get(folderId);
                if (cache) return cache;

                const folder = folderTable.get(folderId);
                const parentId = folder.parentId;

                const res = findKeepId(parentId);
                findKeepIdCache.set(folderId, res);

                return res;
            };

            const childrenFiles = new Map();

            this.files.forEach((v) => {
                if (!v.folderId) return;
                const keepId = findKeepId(v.folderId);
                childrenFiles.set(
                    keepId,
                    (childrenFiles.get(keepId) || []).concat([v])
                );
            });

            return { roots, childrenFiles };
        },
    },

    mounted() {
        pageEvent.$on("update", (page) => (this.hidden = !!page));
        this.load();
    },

    methods: {
        async load() {
            const { files, folders } = await getAllAritcleFileAndFolders();
            this.files = files;
            this.folders = folders;
        },

        title(info) {
            return (info.remark || "").split(" | ")[0] || "(暂无标题)";
        },
        tag(info) {
            return (info.remark || "").split(" | ")[1] || "";
        },
    },
};
</script>


<style lang="scss" scoped>
.home-page {
    padding: 0 48px;
    max-width: 1200px;
    margin: 0 auto;

    &.hidden {
        height: 0;
        opacity: 0;
        overflow-y: hidden;
    }
}

.article-list {
    padding-top: 72px;
    .article-list-title {
        > .title {
            font-size: 30px;
            line-height: 1.25;
            font-weight: bolder;
            color: #000;
            text-align: center;
        }
        > .name {
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 0;
            font-weight: normal;
            color: #9f9f9f;
            text-align: center;
        }

        text-align: left;
        margin-bottom: 64px;
        border-bottom: 2px solid #000000;
        padding-bottom: 17px;
    }

    .article-list-content {
        * {
            transition: all 0.3s ease;
        }
        .article-list-sub-title {
            font-weight: bolder;
            color: #666;
            margin-bottom: 12px;
        }

        &:hover .article-list-sub-title {
            color: #333;
        }
    }

    .article-list-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        grid-gap: 12px 12px;
        grid-auto-rows: 96px;

        position: relative;

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
    }
}
</style>