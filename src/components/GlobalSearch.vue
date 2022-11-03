<template>
    <div
        class="global-search"
        ref="container"
    >
        <div
            :class="{'global-search-inner':true,modal:showModalDone}"
            ref="target"
        >
            <div
                class="search-mask"
                @click="()=>showModal = false"
            ></div>
            <div class="search-input">
                <div class="search-value">
                    <SearchInput
                        ref="input"
                        :disabled="!showModal"
                        :isBlank.sync="isBlank"
                        @focus="()=>showModal = true"
                    />
                </div>
                <div class="search-clear">
                    <SearchClear
                        :isOpen="showModal"
                        :disabled="isBlank"
                        @clear="clearInput"
                    />
                </div>
            </div>
            <div class="search-panel">
                <div class="search-result"></div>
                <SearchOption />
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from "./search/SearchInput.vue";
import SearchClear from "./search/SearchClear.vue";
import SearchOption from "./search/SearchOption.vue";
export default {
    components: { SearchInput, SearchClear, SearchOption },
    data: () => ({
        isBlank: true,
        showModal: false,
        showModalDone: false,
        isTransform: true,
    }),

    watch: {
        showModal(newVal, oldVal) {
            if (newVal === oldVal) return;
            this.isTransform = true;
            const container = this.$refs.container;
            const target = this.$refs.target;
            const { left, top, height, width } =
                container.getBoundingClientRect();
            if (newVal === true) {
                Object.assign(target.style, {
                    left: left + "px",
                    top: top + "px",
                    width: width + "px",
                    height: height + "px",
                    position: "fixed",
                });
                setTimeout(() => {
                    this.showModalDone = true;
                    Object.assign(target.style, {
                        left: "",
                        top: "",
                        position: "",
                        height: "",
                        width: "",
                    });
                });
            } else {
                this.showModalDone = false;
                Object.assign(target.style, {
                    left: left + "px",
                    top: top + "px",
                    width: width + "px",
                    height: height + "px",
                    position: "fixed",
                });
                setTimeout(() => {
                    Object.assign(target.style, {
                        left: "",
                        top: "",
                        position: "",
                        height: "",
                        width: "",
                    });
                }, 600);
            }
        },
    },
    methods: {
        clearInput() {
            this.$refs.input.$$clear();
        },
    },
};
</script>

<style lang="scss" scoped>
.global-search {
    width: 200px;
    height: 36px;
    flex: none;
    .global-search-inner {
        width: 200px;
        z-index: 10;
        position: relative;
        height: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
        * {
            transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
        }

        > .search-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0);
        }
        > .search-input {
            z-index: 1;
            overflow: hidden;
            display: flex;
            height: 36px;
            width: 200px;
            .search-value {
                flex: auto;
                background: #66ccff;
                height: 36px;
                border-radius: 18px;
                cursor: pointer;
            }
            .search-clear {
                flex: none;
            }
        }

        > .search-panel {
            z-index: 1;
            margin-top: 36px;
            margin-bottom: -36px;
            height: 0;
            overflow: hidden;
            display: flex;
            width: 200px;
            opacity: 0;
            .search-result {
                flex: auto;
                background: #66ccff;
                border-radius: 18px;
            }
            .search-option {
                flex: none;
                width: 0;
                margin-left: 16px;
                background: #66ccff;
                border-radius: 18px;
            }
        }

        &.modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            > .search-mask {
                background-color: rgba(255, 255, 255, 0.9);
            }
            > .search-input {
                width: 600px;
            }
            > .search-panel {
                width: 600px;
                height: 640px;
                opacity: 1;

                .search-option {
                    width: 240px;
                }
            }
        }
    }
}
</style>


