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
export function loopDownloadPage (req) { // 启动循环下载线程
    return request({
        url: 'loop_download_page',
        method: 'get',
        params: req
    })
}
export function getAllDown (res) { // 获取所有下载不同状态的任务
    return request({
        url: 'select_task_statuss',
        method: 'get',
        params: res
    })
}
export function getAllUser () { // 根据查询者获取所有不同状态的任务
    return request({
        url: 'select_task_user',
        method: 'get',
        // params: req
    })
}
export function getAllBySuffix () { // 根据文件类型获取所有不同状态的任务
    return request({
        url: 'select_task_suffix',
        method: 'get',
        // params: req
    })
}
export function getAllByCrawl () { // 根据采集类型获取所有不同状态的任务
    return request({
        url: 'select_task_type',
        method: 'get',
        // params: req
    })
}
export function getAllParams (res) { // 获取所有不同类型的数据
    return request({
        url: 'select_task_params',
        method: 'get',
        params: res
    })
}
export function login (res) { // 获取所有不同类型的数据
    return request({
        // url: 'essql/login',
        url: 'login',
        method: 'get',
        params: res
    })
}
