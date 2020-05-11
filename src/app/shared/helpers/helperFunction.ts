
function dataFilter(data){
    const newData = [];
    Object.keys(data).forEach(key => {
        let value = data[key];
        value.statusName = value.status ===1?"Active":"InActive";
        newData.push(value);
      });
    return newData;
}

function processError(data){
  const newData = [];
  Object.keys(data).forEach(key => {
    let value = data[key];
    const newObjectName = value.key;
    const msg = value.errorMessage;
    const newErr = {
      [newObjectName]:msg
    }
    newData.push(newErr);
  });
  return newData;
}
function setErrorMessage(data, keyParam){
  const newError ={};
  Object.keys(data).forEach(keys => {
    let value = data[keys];
    Object.keys(keyParam).forEach(key1=>{
      Object.keys(value).forEach(key2=>{
          if(key1===key2){
            newError[key1] = value[key2];
           
          }
      });
    });
    
  });
  return newError;
}
export {dataFilter, processError,setErrorMessage};