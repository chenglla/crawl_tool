<template>
    <div class="wrapper">
<!--        <v-head></v-head>-->
<!--        <v-sidebar></v-sidebar>-->
<!--        <div class="content-box" :class="{'content-collapse':collapse}">-->
<!--            <v-tags></v-tags>-->
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
<!--        </div>-->
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vSidebarTwo from './SidebarTwo.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import {findAgentInfo} from '@/api/index';
    export default {
        data(){
            return {
                // groupId: '0',
                tagsList: [],
                collapse: false,
                // showOne: true
            }
        },
        components:{
            vHead, vSidebar, vTags, vSidebarTwo
        },
        computed: {
          // groupId () {
          //     console.log('groupId:', this.$store.state.user.groupId)
          //     // return this.$store.state.user.groupId
          //     return localStorage.groupId
          // },
        // level () {
        //     console.log('level:', parseInt(this.$store.state.user.level))
        //     return parseInt(this.$store.state.user.level)
        //   },
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        mounted() {
            // this.getLevel()
            // if (this.level === 1) {
            //     this.showOne = true
            // } else if (this.level === 2) {
            //     this.showOne = false
            // }
        },
        methods: {
            // getLevel () {
            //     findAgentInfo({
            //         b: 0.6,
            //         groupId: this.groupId,
            //         page: 0
            //     }).then(res => {
            //         this.level = res.data.data.level
            //         if (this.level === 1) {
            //             this.showOne = true
            //         } else if (this.level === 2) {
            //             this.showOne = false
            //         }
            //     })
            // }
        }
    }
</script>
