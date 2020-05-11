import gql from 'graphql-tag'

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
  }
}
`;