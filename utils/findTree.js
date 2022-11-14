
function getAllIndices(arr, val) {
  let indices = [];
  let i = -1;
  while((i = arr.indexOf(val, i+1)) != -1){
    indices.push(i);
  }
  return indices;
}

function findTree(data, name) {
  data = data.toUpperCase();
  name = name.toUpperCase();
  const reg_one = new RegExp(':[^:]*?[\n]','g');
  let arr_one = data.match(reg_one).map(item => item.slice(2, item.length-1));
  const reg_two = new RegExp("[a-zA-Z0-9. ']+:[^:]*?[\n]", "g");
  let arr_two = data.match(reg_two).map(item => item.trim());

  const hNumber = arr_one[arr_one.indexOf(name)+2]
  let indices = getAllIndices(arr_one, hNumber);

  let familyArr = [];

  for(let i=0;i<indices.length;i++) {
    let obj = {
      name: arr_one[indices[i]-2],
      parent: arr_one[indices[i]-1]
    }
    familyArr.push(obj);
  }

  checkRelation = i => {
    if (
      arr_two[arr_two.indexOf('Name: ' + familyArr[i].name) + 1][0] == 'u' ||
      arr_two[arr_two.indexOf('Name: ' + familyArr[i].name) + 1][0] == 'H'
    ) {
      familyArr[i]['Husband'] = familyArr[i]['parent']
      delete familyArr[i]['parent']
    } else if (
      arr_two[arr_two.indexOf('Name: ' + familyArr[i].name) + 1][0] == 'o' ||
      arr_two[arr_two.indexOf('Name: ' + familyArr[i].name) + 1][0] == 'M'
    ) {
      familyArr[i]['Mother'] = familyArr[i]['parent']
      delete familyArr[i]['parent']
    } else {
      familyArr[i]['Father'] = familyArr[i]['parent']
      delete familyArr[i]['parent']
    }
  }

  for (let i=0; i<familyArr.length;i++){
    checkRelation(i);
  }
  return familyArr;
}

module.exports = findTree;