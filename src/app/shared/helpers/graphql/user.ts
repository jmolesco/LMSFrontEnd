import gql from 'graphql-tag'

export const getUserList = gql`
query GetUserList(
  $pager: Pager
  $filterStatus: FilterStatus
  $searchKeyword: SearchKeyword
  $orderBy: OrderBy
  $filterRole: FilterRole
){
  GetUserList(
    pager: $pager
    filterStatus: $filterStatus
    searchKeyword: $searchKeyword
    orderBy: $orderBy
    filterRole: $filterRole
  )
  {
    list{
            nuser_id
            nfull_name
      			nuser_name
            nuser_email 
            nuser_firstname
            nuser_suffixname
            nuser_lastname
      		  ndefault_pageview
            nuser_middlename
            nuser_picture
            nuser_password
            nuser_group
            nuser_phone1
            nuser_phone2
            tuser_birthdate
            suser_birthplace
            saddress_line_1
            saddress_line_2
            scity
            sstate
            suser_country
            nnationality_id
            nuser_verified
            nuser_gender
            sguardian_lastname
            sguardian_middlename
            sguardian_firstname
            scontact_emergency
            slast_school_attended
            intime  
            uptime    
            status
    }
    pageInfo{
      totalPage
      totalRecords
      currentPage
    }
  }
}
`;

export const submitUserInsertAction = gql`
mutation createUser($userInput:UserInput!)
  {
    createUser(userInput:$userInput)
  }
`;

export const submitUserLogInAction = gql `
mutation logInUser($userLogInInput:UserLogInParameter!){
  logInUser(userLogInInput:$userLogInInput)
  {
    token
    fullName
    userName
    id
    ndefault_pageview
  }
}
`;

export const submitUserDeleteAction = gql`
mutation deleteUser($userDeleteInput:UserDeleteInput!){
  deleteUser(userDeleteInput:$userDeleteInput )
}
`;

export const getUserDetail = gql`
query GetUserDetail($id: Int!){
  GetUserDetail(id: $id){
    nuser_id
    nuser_name
    nuser_email
    nuser_firstname
    nfull_name
    nuser_suffixname
    nuser_lastname
    nuser_middlename
    nuser_picture
    nuser_password
    nuser_group
    nuser_phone1
    nuser_phone2
    tuser_birthdate
    suser_birthplace
    saddress_line_1
    saddress_line_2
    scity
    sstate
    suser_country
    nnationality_id
    nuser_verified
    nuser_gender
    sguardian_lastname
    sguardian_middlename
    sguardian_firstname
    scontact_emergency
    slast_school_attended
    intime
    uptime
    status
    ndefault_pageview
  }
}
`;