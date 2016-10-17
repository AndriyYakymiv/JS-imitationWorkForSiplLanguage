function getReadData(){
  function getInputProgram(read){
        var readmas= read.split('\n');
        var inputProgramArr = [];
        for(var i = 0; i < readmas.length; i++){
          var testp1 = readmas[i].split(" ");
          var testp2 = [];
          for(var j = 0; j < testp1.length; j++){
                  if(testp1[j] != ""){
                    testp2[testp2.length] = testp1[j];
                  }
           }

          if (testp2.length == 1)
            inputProgramArr[inputProgramArr.length] = readmas[i];
          else {
                inputProgramArr[inputProgramArr.length] = readmas[i];
                for(var k = 0; k < testp2.length; k++){
                  inputProgramArr[inputProgramArr.length] = testp2[k]; 
                }
          }
        }
        return inputProgramArr;
    }

    function getInputValues(inputValueArr){
      for (var i = 0; i < inputValueArr.length; i++){
        for (var j = 0; j < inputValueArr[i].length; j++){
          if (inputValueArr[i][j] == ' ')
          inputValueArr[i] = inputValueArr[i].replace(inputValueArr[i][j],"");
        }
      }
      var inputValues = [];
      for (var i = 0; i < inputValueArr.length; i++){
        inputValues[i] = inputValueArr[i].split(':');
      }
      var inp = {};
      for (var i = 0; i < inputValues.length; i++){
        inp[inputValues[i][0]] = +inputValues[i][1];
      }
      return inp;
    }

      //read Input Program
  var inputProgram = document.getElementById("programText").value+"";
  var inputProgramArr = [];
  inputProgramArr = getInputProgram(inputProgram);

  //read Input Values
  var inputValues = (document.getElementById("inputText").value + "").split(',');
  var inpValuesObj = {};
  inpValuesObj = getInputValues(inputValues);

  //define Error
  var errors = {type: "ERROR"};
  var result = calcResult(inputProgramArr, errors, inpValuesObj);


    if (errors.type != "ERROR") {
      alert(errors.type);
    } 
    
    var readed = {};
    readed.result = result;
    readed.inputProgramArr = inputProgramArr;
    return readed; 
}