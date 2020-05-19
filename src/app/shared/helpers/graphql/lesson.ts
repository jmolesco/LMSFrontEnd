import gql from 'graphql-tag'

export const lessonList = gql `
query GetLessonList($pager: Pager, 
    $filterStatus: FilterStatus,
    $filterCourse: FilterCourse,
    $searchKeyword:SearchKeyword
    $orderBy:OrderBy
  )
{
    GetLessonList(pager:$pager , 
      filterStatus:$filterStatus ,
      filterCourse:$filterCourse ,
      searchKeyword:$searchKeyword ,
      orderBy:$orderBy 
    )
    {
      list {
            id
            title
            duration
            course_id
            scourse_title
            attachment_type
            attachment
            summary
            intime
            uptime
            status
      }
      pageInfo {
        totalPage
        totalRecords
        currentPage
      }
    }
  }

`;

export const lessonDetail = gql `
query GetLessonDetail($id:Int!){
    GetLessonDetail(id:$id ){
      id
      title
      duration
      course_id
      attachment_type
      attachment
      summary
      intime
      uptime
      status
    }
  }
`;

export const submitLessonInsertAction = gql `
mutation createLesson($lessonInput: LessonInput!){
    createLesson(lessonInput: $lessonInput)
  }
`;

export const submitLessonEditAction = gql `
mutation updateLesson($lessonUpdateInput: LessonUpdateInput!){
    updateLesson(lessonUpdateInput: $lessonUpdateInput)
  }
`;

export const submitLessonDeleteAction = gql `
mutation deleteLesson($lessonDeleteInput: LessonDeleteInput!){
    deleteLesson(lessonDeleteInput: $lessonDeleteInput)
  }
`;








