export type category = {
    ncategory_id: number,
    scategory_name: string,
    intime: string,
    uptime: string,
    status: boolean
}
export type pageInfo = {
    totalRecords: number
    totalPage: number
    currentPage: number
    totalPerPage: number
}
export type categoryList = {
    list:[category],
    pageInfo:pageInfo
}
export type Query = {
    infor(pager:{pager:number}):categoryList
}