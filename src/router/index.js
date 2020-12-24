import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
            //redirect: '/bigScreen'
            // redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '新建采集任务' }
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/feedback.vue'], resolve),
                    meta: { title: '任务列表' }
                },
                // {
                //     path: '/icon',
                //     component: resolve => require(['../components/page/Icon.vue'], resolve),
                //     meta: { title: '自定义图标' }
                // },
                {
                    path: '/table',
                    name: 'table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '操作采集任务' }
                },
                // {
                //     path: '/tableTwo',
                //     name: 'tableTwo',
                //     component: resolve => require(['../components/page/BaseTableTwo.vue'], resolve),
                //     meta: { title: '收益查看' }
                // },
                {
                    path: '/promotion',
                    component: resolve => require(['../components/page/promotionCode.vue'], resolve),
                    meta: { title: '在线打开页面' }
                },
                {
                    path: '/introduction',
                    component: resolve => require(['../components/page/introduction.vue'], resolve),
                    meta: { title: '采集说明' }
                },
                {
                    path: '/analysis',
                    component: resolve => require(['../components/page/analysis.vue'], resolve),
                    meta: { title: '解析网址' }
                },
                {
                    path: '/analysisDetail',
                    component: resolve => require(['../components/page/analysisDetail.vue'], resolve),
                    meta: { title: '解析网址' }
                },
                // {
                //     path: '/moudle',
                //     component: resolve => require(['../components/page/moudleTable.vue'], resolve),
                //     meta: { title: '模板查询' }
                // },
                // {
                //     path: '/tabs',
                //     component: resolve => require(['../components/page/Tabs.vue'], resolve),
                //     meta: { title: '信息查看' }
                // },
                // {
                //     path: '/formD',
                //     component: resolve => require(['../components/page/FormD.vue'], resolve),
                //     meta: { title: '动态网址' }
                // },
                // {
                //     path: '/formJ',
                //     component: resolve => require(['../components/page/FormJ.vue'], resolve),
                //     meta: { title: '静态网址' }
                // },
                // {
                //     path: '/pub',
                //     component: resolve => require(['../components/page/PubForm.vue'], resolve),
                //     meta: { title: '公众号爬取' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: resolve => require(['../components/page/Permission.vue'], resolve),
                //     meta: { title: '权限测试', permission: true }
                // },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            //name:'login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/bigScreen',
            name:'bigScreen',
            component: resolve => require(['../components/page/bigScreen1112.vue'], resolve)
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})
