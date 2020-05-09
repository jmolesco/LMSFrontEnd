import gql from 'graphql-tag'

export const categoryList = gql`
        query GetCategoryList($pager:Pager,
            $filterStatus: FilterStatus,
            $searchKeyword:SearchKeyword
            $orderBy: OrderBy)
        {    
            GetCategoryList(pager:$pager,
                filterStatus: $filterStatus,
                searchKeyword:$searchKeyword
                orderBy:$orderBy
                )
            {
                    list
                    {
                    ncategory_id
                    scategory_name
                    intime
                    uptime
                    status
                    }
                    pageInfo 
                    {
                    totalPage
                    totalRecords
                    currentPage
                    }
            }          
        }
        `;
export const categoryDetail = gql`
        query GetCategoryDetail($id: Int!)
        {
            GetCategoryDetail(id: $id)
            {
                ncategory_id
                scategory_name
                intime
                uptime
                status
            }
        }
        `;
export const submitDeleteAction = gql`
        mutation ($categoryDeleteInput:CategoryDeleteInput!)  
        {
            deleteCategory(categoryDeleteInput:$categoryDeleteInput)
        }
    `;
export const submitInsertAction = gql `
        mutation createCategory($categoryInput:CategoryInput!){
            createCategory(categoryInput:$categoryInput)
        }
    `;
export const submitEditAction = gql `
    mutation updateCategory($categoryUpdateInput:CategoryUpdateInput!){
        updateCategory(categoryUpdateInput:$categoryUpdateInput)
    }
`;