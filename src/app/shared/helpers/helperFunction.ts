
function dataFilter(data){
    const newData = [];
    Object.keys(data).forEach(key => {
        let value = data[key];
        value.statusName = value.status ===1?"Active":"InActive";
        newData.push(value);
      });
    return newData;
}
export {dataFilter};