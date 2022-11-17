import App from './src/App'
import Vue from 'vue'
import Antd from 'ant-design-vue';
import VueRouter from 'vue-router';
import router from './src/router'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css'
import './src/markdown-style/index.scss'
import { ERequest, AxiosAdapter } from 'e-request'
import { auth } from './src/auth'

import { EIcon } from 'e-components-file/lib/EIcon.common'
import { ETree } from 'e-components-file/lib/ETree.common'
import { EFileIcon } from 'e-components-file/lib/EFileIcon.common'
import { EUploadArea } from 'e-components-file/lib/EUploadArea.common'
import { ETreeItem } from 'e-components-file/lib/ETreeItem.common'

import 'e-components-file/lib/EIcon.css'
import 'e-components-file/lib/ETree.css'
import 'e-components-file/lib/ETreeItem.css'
import 'e-components-file/lib/EFileIcon.css'
import 'e-components-file/lib/EUploadArea.css'

import TriggleChange from './src/components/common/TriggleChange.vue'
import SimpleInput from './src/components/common/SimpleInput.vue'
import SimpleTextarea from './src/components/common/SimpleTextarea.vue'
import SimpleActionTitle from './src/components/common/SimpleActionTitle.vue'
import CommentInput from './src/components/discuss/CommentInput.vue'
import { Flex } from './src/components/flex/index'

Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(EIcon)
Vue.use(Flex)
Vue.use(EFileIcon)
Vue.use(EUploadArea)

Vue.component('ETree', ETree)
Vue.component('ETreeItem', ETreeItem)
Vue.component('TriggleChange', TriggleChange)
Vue.component('SimpleInput', SimpleInput)
Vue.component('SimpleTextarea', SimpleTextarea)
Vue.component('SimpleActionTitle', SimpleActionTitle)
Vue.component('CommentInput', CommentInput)

new Vue({
    router: router,
    render: H => H(App)
}).$mount('#app')


ERequest.adapter = new AxiosAdapter(axios)
ERequest.fetchToken = () => Promise.resolve(auth.getToken())
ERequest.errorAlert = (e) => alert(e.message)
ERequest.authDeal = (e) => console.error(e)