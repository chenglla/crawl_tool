import request from '@/utils/request'

export function insertTask (req) { // 新建采集任务
    return request({
        url: 'insert_task',
        method: 'get',
        params: req
    })
}
export function selectTask (req) { // 获取已经提交的任务
    return request({
        url: 'select_task',
        method: 'get',
        params: req
    })
}
export function deleteTask (req) { // 删除某个已经提交的任务
    return request({
        url: 'delete_task',
        method: 'get',
        params: req
    })
}
export function updateTask (req) { // 更新某个已经提交的任务
    return request({
        url: 'update_task',
        method: 'get',
        params: req
    })
}
export function accessPage () { // 在线打开一个页面
    return request({
        url: 'access_page',
        method: 'get'
        // params: req
    })
}
export function loopDownloadPage () { // 启动循环下载线程
    return request({
        url: 'loop_download_page',
        method: 'get',
        // params: req
    })
}
