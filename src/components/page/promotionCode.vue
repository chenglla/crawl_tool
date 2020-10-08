<template>
    <div class="table">
        <el-row>

        </el-row>
    </div>
</template>

<script>
    import {accessPage} from '@/api/index'
    export default {
        data() {
            return {
            }
        },
        mounted () {
            this.getPage()
        },
        methods: {
            getPage () {
                accessPage().then(res => {
                    console.log('打开了')
                })
            }
        }
    }
</script>

<style scoped>

</style>
