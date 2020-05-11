import gql from 'graphql-tag'

export const courseList = gql`
query GetCourseList(
        $pager:Pager,
        $filterStatus: FilterStatus,
        $searchKeyword:SearchKeyword,
        $orderBy: OrderBy)
     {
        GetCourseList(pager:$pager,filterStatus: $filterStatus,searchKeyword:$searchKeyword,orderBy:$orderBy)
        {
            list{
                ncourse_id,
                scourse_title,
                scourse_description,
                scourse_photo,
                ncategory_id,
                scategory_name,
                ncreated_by,
                nupdated_by,
                intime,
                uptime,
                status,
              }
              pageInfo{
                totalPage
                totalRecords
                currentPage
              }
        }
    }
`;
export const courseDetail = gql`
query
    GetCourseDetail($id: Int!)
    {
        GetCourseDetail(id: $id)
        {
            ncourse_id,
            scourse_title,
            scourse_description,
            scourse_photo,
            ncategory_id,
            scategory_name,
            ncreated_by,
            nupdated_by,
            intime,
            uptime,
            status,
        }
    }
`;
export const submitCourseDeleteAction = gql`
mutation ($courseDeleteInput:CourseDeleteInput!) 
    {
     deleteCourse(courseDeleteInput:$courseDeleteInput)
    }
`;
export const submitCourseInsertAction = gql `
        mutation createCourse($courseInput:CourseInput!){
            createCourse(courseInput:$courseInput)
        }
    `;
export const submitCourseEditAction = gql `
    mutation updateCourse($courseUpdateInput:CourseUpdateInput!){
        updateCourse(courseUpdateInput:$courseUpdateInput)
    }
`;