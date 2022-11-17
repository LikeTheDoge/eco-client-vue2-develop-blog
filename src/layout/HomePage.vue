<template>
    <div :class="{'home-page':true,hidden}">
        <div class="home-page-inner">
            <div
                class="article-list"
                v-for="v in [0,1,2]"
                :key="v"
            >
                <div class="article-list-title">
                    <div class="title">技术架构设计</div>
                    <div class="name">tech</div>
                    <div class="hr"></div>
                </div>

                <div class="article-list-content">
                    <div class="article-list-sub-title">前端技术</div>
                    <div
                        class="article-list-items"
                    >

                        <div
                            class="article-list-item"
                            v-for="v in [0,1,2,3,4,5,6,7]"
                            :key="v"
                        >
                            <div class="article-icon"></div>
                            <div class="article-info">
                                <div class="article-info-link">
                                    <router-link to="/post/aaaa"><span class="tag">前端 :</span>技术架构设计概述契丹段述技术架构设计概述契丹段述</router-link>
                                </div>
                                <div class="article-info-desc">Bob Smith - December 22, 2021</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="article-list-content">
                    <div class="article-list-sub-title">运维实施</div>
                    <div
                        class="article-list-items"
                    >

                        <div
                            class="article-list-item"
                            v-for="v in [0,1,2]"
                            :key="v"
                        >
                            <div class="article-icon"></div>
                            <div class="article-info">
                                <div class="article-info-link">
                                    <router-link to="/post/aaaa"><span class="tag">前端 :</span>技术架构设计概述契丹段述技术架构设计概述契丹段述</router-link>
                                </div>
                                <div class="article-info-desc">Bob Smith - December 22, 2021</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { pageEvent } from "../eventbus/page";

export default {
    data() {
        return {
            hidden: false,
        };
    },

    mounted() {
        pageEvent.$on("update", (page) => (this.hidden = !!page));
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
    }
}

.article-list {
    padding-bottom: 271px;
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
        margin-bottom: 48px;
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
            margin-top: 24px;
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