
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
    const newObjectName = value.key + "_err";
    const msg = value.errorMessage;
    const newErr = {
      [newObjectName]:msg
    }
    newData.push(newErr);
  });
  return newData;
}
export {dataFilter, processError};