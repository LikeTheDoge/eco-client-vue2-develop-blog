<template>
    <div class="sidershow">
        <div
            class="bg"
            ref="bg"
        ></div>
        <div
            class="layer"
            v-if="file"
        >
            <div class="content">
                <div class="article">

                    <div class="title">
                        <router-link :to="`/post${file.path}`">{{(file.remark || '').split(' | ')[0]}}</router-link>
                    </div>
                    <div class="desc">
                        <UserAvatar
                            style="vertical-align:bottom"
                            :size="36"
                            :url="file.updateUserAvatar"
                        /> {{file.updateUserName}}
                        <!-- <DateText :date="file.updateTime" /> -->
                    </div>
                    <div class="btns">
                        <div
                            @click="above()"
                            class="above"
                        >{{"<"}}</div>
                        <div
                            @click="next()"
                            class="next"
                        >{{'>'}}</div>
                    </div>
                </div>

            </div>

        </div>
        <div
            class="bgcache"
            ref="bgcache"
        ></div>
    </div>
</template>

<script>
import { getSliderShowData } from "../../requests/aritcle";

export default {
    data() {
        return {
            list: [],
            current: 0,
            isLocked: false,
        };
    },
    async mounted() {
        this.init();

        setTimeout(() => {
            this.above();
        }, 5000);
    },
    computed: {
        file() {
            const target = this.list[this.current];
            if (target) return target.file || null;
            else return null;
        },
    },
    methods: {
        async init() {
            this.list = await getSliderShowData();

            this.$images = this.list.map(({ bg }) => {
                const img = document.createElement("div");
                img.style.backgroundImage = `url("${bg}")`;
                img.classList.add("img_bg");
                return img;
            });
            this.$images.forEach((v) => {
                this.$refs.bgcache.appendChild(v);
            });
            const current = this.$images[this.current];
            this.$refs.bg.appendChild(current);
            current.classList.add("current");
        },
        clear() {
            this.$images.forEach((v) => {
                v.classList.remove("current");
                v.classList.remove("next");
                v.classList.remove("above");
                this.$refs.bgcache.appendChild(v);
            });
        },
        next() {
            if (!this.list.length) return;
            if (this.lock()) return;
            this.stop();
            this.clear();

            const currentIdx = this.current;
            const nextIdx =
                currentIdx === this.list.length - 1 ? 0 : this.current + 1;

            console.log(currentIdx, nextIdx);

            const current = this.$images[currentIdx];
            const next = this.$images[nextIdx];

            this.$refs.bg.appendChild(current);
            this.$refs.bg.appendChild(next);
            current.classList.add("current");
            next.classList.add("next");
            this.current = nextIdx;

            setTimeout(() => {
                current.classList.remove("current");
                next.classList.remove("next");

                current.classList.add("above");
                next.classList.add("current");
            }, 0);
            this.loop();
        },
        above() {
            if (!this.list.length) return;
            if (this.lock()) return;
            this.stop();
            this.clear();

            const currentIdx = this.current;
            const aboveIdx =
                currentIdx === 0 ? this.$images.length - 1 : this.current - 1;

            const current = this.$images[currentIdx];
            const above = this.$images[aboveIdx];

            this.$refs.bg.appendChild(current);
            this.$refs.bg.appendChild(above);
            current.classList.add("current");
            above.classList.add("above");
            this.current = aboveIdx;

            setTimeout(() => {
                current.classList.remove("current");
                above.classList.remove("above");

                current.classList.add("next");
                above.classList.add("current");
            }, 0);

            this.loop();
        },

        stop() {
            if (this.$loopTimeout) {
                clearTimeout(this.$loopTimeout);
            }
        },
        loop() {
            this.$loopTimeout = setTimeout(() => {
                this.next();
            }, 5000);
        },
        lock() {
            if (this.isLocked) return this.isLocked;
            this.isLocked = true;
            setTimeout(() => {
                this.isLocked = false;
            }, 500);
        },
    },
};
</script>

<style lang="scss">
.sidershow {
    position: relative;

    .layer {
        height: 100%;
        z-index: 4;
        position: relative;
        background-color: rgba(0, 0, 0, 0.4);
        .content {
            width: 1200px;
            padding: 0 48px;
            height: 100%;
            padding-top: 128px;
            margin: 0 auto;

            .article {
                width: 800px;

                .title {
                    font-size: 54px;
                    font-weight: bold;
                    color: #fff;
                    text-shadow: 0 4px 8px rgb(0 0 0);
                    >a{
                        color: #fff;
                    }
                }
                .desc {
                    font-size: 20px;
                    color: #fff;
                    text-shadow: 0 2px 4px rgb(0 0 0);
                    margin-top: 20px;
                    padding-left: 4px;
                }
                .btns {
                    display: flex;
                    > div {
                        height: 32px;
                        width: 32px;
                        border-radius: 50%;
                        background: rgba(0, 0, 0, 0.9);
                        margin-right: 12px;
                        margin-top: 36px;
                        text-align: center;
                        line-height: 26px;
                        color: #fff;
                        font-size: 24px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
        }
    }
    .bg {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        > .img_bg {
            height: 100%;
            position: absolute;
            background-size: cover;
            background-position: center;
            top: 0;
            transition: all 0.5s ease-in-out;

            &.current {
                left: 0;
                right: 0;
            }
            &.above {
                left: -100%;
                right: 100%;
            }
            &.next {
                left: 100%;
                right: -100%;
            }
        }
    }
    .bgcache {
        display: none;
    }
    height: 600px;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    background: #ccc;
}
</style>