import FlexCol from "./FlexCol.vue";
import FlexRow from "./FlexRow.vue";
import FlexFill from "./FlexFill.vue";
import FlexFixed from "./FlexFixed.vue";

export const Flex = {
    install(Vue) {
        Vue.component('FlexCol', FlexCol)
        Vue.component('FlexRow', FlexRow)
        Vue.component('FlexFill', FlexFill)
        Vue.component('FlexFixed', FlexFixed)
    }
}