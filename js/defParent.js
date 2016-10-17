function getData(){

  function defineDataForBuilding(result,inputProgramArr){
    var data = [];
    var beg = [];
    for(var i = 0; i < result.length ; i++){
      if(i == 0 ) {
      data[i] = { "name": result[i][1], "parent": "null", "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
      }
      else{
        if (inputProgramArr[result[i][0]] == "begin") {
        beg.push(inputProgramArr[result[i - 1][0]]);
       
        data[i] = { "name": result[i][1], "parent": beg[beg.length -1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
        }
        else if (inputProgramArr[result[i][0]] == "end") {
              data[i] = { "name": result[i][1], "parent":  beg[beg.length - 1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
              beg.pop();
              }
              else if (result[i][1].length <= 2 || result[i][1] == "while"){
                      data[i] = { "name": result[i][1], "parent": inputProgramArr[parRem], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
                    }
                    else {
                      data[i] = { "name": result[i][1], "parent": beg[beg.length - 1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
                      parRem = i;
                    }
        }
    } 
    return data;
  }


  function defineDataForImitation(result,inputProgramArr){
    var data = [];
    var beg1 = [];
    var parRem = 0; 

    for(var i = 0; i < inputProgramArr.length ; i++){
      if(i == 0 ) {
      data[i] = { "name": inputProgramArr[i], "parent": "null", "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
      }
      else{
        if (inputProgramArr[i] == "begin") {
        beg1.push(inputProgramArr[i - 1]);
       
        data[i] = { "name": inputProgramArr[i], "parent": beg1[beg1.length -1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
        }
        else if (inputProgramArr[i] == "end") {
              data[i] = { "name": inputProgramArr[i], "parent":  beg1[beg1.length - 1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
              beg1.pop();
              }
              else if (inputProgramArr[i].length <= 2 || inputProgramArr[i] == "while"){
                      data[i] = { "name": inputProgramArr[i], "parent": inputProgramArr[parRem], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
                    }
                    else {
                      data[i] = { "name": inputProgramArr[i], "parent": beg1[beg1.length - 1], "value": result[i][2], "row": result[i][0], "level" : "grey", "cur": result[i][3]};
                      parRem = i;
                    }
        }
    } 
    return data;
  }

  var readedData = getReadData();
  var result = readedData.result;
  var inputProgramArr = readedData.inputProgramArr;

  var data = [];
  data = defineDataForBuilding(result,inputProgramArr);

  var data1 = [];
  data1 = defineDataForImitation(result,inputProgramArr);

  var ans = {};
  ans.data = data;
  ans.data1 = data1;
  return ans;
}