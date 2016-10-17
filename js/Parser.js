const CompilationError = "Compilation error!";
const RuntimeError = "Runtime error!";
const ReservedWords = ["while", "begin", "end", "if", "else", "then", "do"];

function getValueOfVariable(example, dict) {
  if (!(example in dict)) {
    return null;
  } else {
    return dict[example];
  }
}
function pushError(errors, errorString) {
    errors.type = errorString;
}
function deleteSpaces(tmp) {
  var str = tmp;
  while (str.length > 0 && str[0] == ' ') {
    str = str.substring(1);
  }
  while (str.length > 0 && str[str.length - 1] == ' ') {
    str = str.substring(0, str.length - 1);
  }
  if (str.length > 0 && str[str.length - 1] == ';') {
    str = str.substring(0, str.length - 1);
  }
  return str;
}

function typeOfCondition(str) {
  if (str == ">") return 0;
  if (str == "<") return 1;
  if (str == ">=") return 2;
  if (str == "<=") return 3;
  if (str == "==") return 4;
  if (str == ":=") return 5;
  if (str == "!=") return 6;
  return null;
}

function makeOperation(str, a, b) {
  if (str == "+") {
    return a + b;
  } else if (str == "-") {
    return a - b;
  } else if (str == "*") {
    return a * b;
  } else {
    if (b == 0) {
      return null;
    } else {
      return a / b;
    }
  }
}

function toNumber(tmp) {
  var sign = 0;
  if (tmp.length > 0) {
    if (tmp[0] == '-') {
      sign = 1;
      tmp = tmp.substring(1);
    }
  }
  var res = 0;
  for (var i = 0; i < tmp.length; ++i) {
    res = res * 10 + tmp[i] - '0';
  }
  if (sign > 0) {
    res = res * (-1);
  }
  return res;
}
function isNumber(tmp) {
  var sign = 0;
  if (tmp.length > 0) {
    if (tmp[0] == '-') {
      sign = 1;
      tmp = tmp.substring(1);
    }
  }
  var nstr = tmp;
  nstr = deleteSpaces(nstr);
  for (var i = 0; i < nstr.length; ++i) {
    if (!isDigit(nstr[i])) {
      return false;
    }
  }
  return true;
}
function isVariable(str) {
  if (str.length == 0) {
    return false;
  }
  if (isDigit(str[0])) {
    return false;
  }
  for (var i = 0; i < str.length; ++i) {
    if (!isDigit(str[i]) && !isAlpha(str[i])) {
      return false;
    }
  }
  return true;
}
function isDigit(c){
  if (c >= '0' && c <= '9') {
    return true;
  } else {
    return false;
  }
}
function isAlpha(c) {
  if (c >= 'a' || c <= 'z') {
    return true;
  } else if (c >= 'A' && c <= 'Z') {
    return true;
  } else {
    return false;
  }
}
function isReserved(str) {
  for (var i = 0; i < ReservedWords.length; ++i) {
    if (ReservedWords[i] == str) {
      return true;
    }
  }
  return false;
}

function isOperation(str) {
  if (str == "+" || str == "-" || str == "/" || str == "*") {
    return true;
  } else {
    return false;
  }
}


function isCondition(str) {
  nArr = str.split(" ");
  if (nArr.length != 3) {
    return false;
  }
  if (typeOfCondition(nArr[0]) != null 
    || typeOfCondition(nArr[2]) != null
    || typeOfCondition(nArr[1]) === null) {
    return false;
  }

  if (typeOfCondition(nArr[1]) == 5) {
    return false;
  }
  return true;
}

function ifCondition(str) {
  var nstr = str;
  var nArr = nstr.split(" ");
  if (nArr.length < 3) {
    return false;
  }
  if (nArr[0] != "if" || nArr[nArr.length - 1] != "then") {
    return false;
  } else {
    var tmp = [];
    for (var i = 1; i + 1 < nArr.length; ++i) {
      tmp[tmp.length] = nArr[i];
    }
    nArr = tmp;
  }
  for (var i = 0; i < 2; ++i) {
    nstr = nstr.substring(1);
  }
  for (var i = 0; i < 4; ++i) {
    nstr = nstr.substring(0, nstr.length - 1);
  }
  nstr = deleteSpaces(nstr);
  return isCondition(nstr);
}

function whileConstruction(str) {
  if (str.length < 6) {
    return false;
  } else {
    var nString = "while";
    for (var i = 0; i < nString.length; ++i) {
      if (nString[i] != str[i]) {
        return false;
      }
    }
    return true;
  }
}
function checkCondition(tmp, variables) {
  var nstr = tmp;
  nArr = nstr.split(" ");
  if (!isCondition(nstr)) {
    return null;
  }
  var firstValue = getValueOfVariable(nArr[0], variables);
  var secondValue = getValueOfVariable(nArr[2], variables);

  switch (nArr[1]) {
    case ">=":
      return firstValue >= secondValue;
      break;
    case ">":
      return firstValue > secondValue;
      break;
    case "<=":
      return firstValue <= secondValue;
      break;
    case "<":
      return firstValue < secondValue;
      break;
    case "==":
      return firstValue == secondValue;
      break;
    case "!=":
      return firstValue != secondValue;
      break;
  }
  return null;
}
function checkIfCondition(tmp, variables) {
  var nstr = tmp;
  var nArr = nstr.split(" ");
  if (nArr.length < 3) {
    return null;
  }
  if (nArr[0] != "if" || nArr[nArr.length - 1] != "then") {
    return null;
  } else {
    var tmp = [];
    for (var i = 1; i + 1 < nArr.length; ++i) {
      tmp[tmp.length] = nArr[i];
    }
    nArr = tmp;
  }
  for (var i = 0; i < 2; ++i) {
    nstr = nstr.substring(1);
  }
  for (var i = 0; i < 4; ++i) {
    nstr = nstr.substring(0, nstr.length - 1);
  }
  nstr = deleteSpaces(nstr);
  return checkCondition(nstr, variables);
}
function checkWhileCondition(tmp, variables) {
  var nstr = tmp;
  if (!whileConstruction(tmp)) {
    return null;
  }
  nstr = nstr.substring(5);
  nstr = deleteSpaces(nstr);
  var tmpArr = nstr.split(' ');
  if (tmpArr.length == 0 || tmpArr[tmpArr.length - 1] != "do") {
    return null;
  } else {
    tmpArr.pop();
  }
  for (var i = 0; i < 2; ++i) {
    nstr = nstr.substring(0, nstr.length - 1);
  }
  nstr = deleteSpaces(nstr);
  if (!isCondition(nstr)) {
    return null;
  }
  var check = checkCondition(nstr, variables);
  return check;
}


function findVariable(str, errors) {
  if (str.length == 0) {
    pushError(errors, "There's no variable.");
    return null;
  }
  while(str.length > 0 && str[0] == ' ') {
    str = str.substring(1);
  }
  while (str.length > 0 && str[str.length - 1] == ' ') {
    str.pop();
  }
  return str;
}
function getFunctionPrototype(str, variables, errors) {
  var n = str.length

  var posStart = -1;
  for (var i = 0; i < n; ++i) {
    if (str[i] == '(') {
      if (posStart != -1) {
        pushError(errors, "( in function prototype.");
        return null;
      }
      posStart = i;
    }
  }
  if (posStart == -1) {
    pushError(errors, CompilationError);
    return null;
  }
  var ret = str.substring(0, posStart);
  var posFinish = -1;
  for (var i = 0; i < n; ++i) {
    if (str[i] == ')') {
      if (posFinish != -1) {
        pushError(errors, ") in function prototype.");
        return null;
      }
      posFinish = i;
    }
  }
  if (posFinish < posStart) {
    pushError(errors, "Some trouble with function prototype.");
    return null;
  }

  var last = posStart + 1;
  for (var i = posStart + 1; i <= posFinish; ++i) {
    if (str[i] == ')' || str[i] == ',') {
      if (last == i) {
        pushError(errors, CompilationError);
        return null;
      }
      var newVariable = findVariable(str.substring(last, i), errors);
      if (newVariable == null) {
        return null;
      }
      var check = true;
      for (var j = 0; j < variables.length; ++j) {
        if (variables[j] === newVariable) {
          check = false;
          break;
        }
      }
      if (!check) {
        pushError(errors, "Wrong number of input values in function prototype."); 
        return null;
      }
      variables[variables.length] = newVariable;
      last = i + 1; 
    }
  }

  if (str[str.length - 1] != ')') {
    pushError(errors, ") in function prototype.");
    return null;
  }
  return ret;
}

function encode(data) {
  return 2;
}
function calcResult(data, errors, dictInput){
  function coincide(fArr, sArr) {
    for (var a in fArr) {
      if (!(fArr[a] in sArr)) {
        return false;
      }
    }
    for (var a in sArr) {
      var was = false;
      for (var it = 0; it < fArr.length; ++it) {
        if (String(a) == fArr[it]) {
          was = true;
          break;
        }
      } 
      if (!was) {
        return false;
      }
    }
    return true;
  }
  

  var variables = dictInput;
  var ans = 0;
  var n = data.length;
  if (n == 0) {
    pushError(errors, "There's no any input program.");
    return null;
  }
  var brackets = [];
  var goBracket = [];
  for (var i = 0; i < n; ++i) {
    goBracket[i] = -1;
  }
  for (var i = 0; i < n; i++) {
    if (data[i].search("begin") != -1) {
      brackets[brackets.length] = i;
    } else if (data[i].search("end") != -1){
      if (brackets.length == 0) {
        pushError(errors, CompilationError);
        return null;
      }
      var index = brackets[brackets.length - 1];
      goBracket[index] = i;
      goBracket[i] = index;
      brackets.pop();
      if (brackets.length == 0 && i != n - 1) {
        pushError(errors, CompilationError);
      }
    }
  }
  if (brackets.length != 0) {
    pushError(errors, "There's trouble with begin-end construction.");
    return null;
  }
  var variablesList = [];
  var functionName = getFunctionPrototype(data[0], variablesList, errors);
  if (functionName === null) {
    return null;
  }
  if (!coincide(variablesList, variables) || functionName.length == 0 || !isAlpha(functionName[0])) {
    pushError(errors, "Input data is different from data in function prototype.");
    return null;  
  }
  for (var i = 0; i < variablesList.length; ++i) {
    if (!isVariable(variablesList[i])) {
      pushError(errors, CompilationError);
      return null;
    }
  }
  for (var i = 0; i < ReservedWords.length; ++i) {
    if (ReservedWords[i] === functionName) {
      pushError(errors, "Reserved words in function prototype.");
      return null;
    }
  }
  for (var i = 0; i < data.length; ++i) {
    data[i] = deleteSpaces(data[i]);
  }


  var cur = 1;
  var outputData = [];
  var variables1 = {};
  var variables2 = {};
  var variables3 = {};
  var variables4 = {};
  var variables5 = {};
  var variables6 = {};
  var variables7 = {};
  var variables8 = {};
  var variables9 = {};
  var variables10 = {};
  var variables11 = {};
  var variables12 = {};
  var variables13 = {};
  var enteredWhile = false;

  var countEl = 0;
  var countStr = 0;
  var currowwhile = 0;

outputData[outputData.length] = [0,data[0],variables,0];


  while (cur < n) {
   if(data[cur] != "while" && data[cur].length > 2 ){
        countEl = 0;
        countStr++;
        if (data[cur].search("end") != -1) {
          if (data[cur] != "end") {
            pushError(errors, "Trouble with end.");
            return null;
          } 
          var index = goBracket[cur] - 6;
          enteredWhile = true;


        variables1 = {};
        for (var key in variables) {
          variables1[key] = variables[key];
        }          
        outputData[outputData.length] = [countStr,data[cur],variables1, cur];
        if(cur == n - 1) return outputData;
        
          if (index < 0) {
            pushError(errors, "Trouble with begin-end construction.");
            return null;
          }
          if (whileConstruction(data[index])) {
            var check = checkWhileCondition(data[index], variables);
            if (!enteredWhile){
            variables2 = {};
            for (var key in variables) {
              variables2[key] = variables[key];
            }     
              outputData[outputData.length] = [currowwhile,data[cur], variables2, cur];
          }
          else {
                countStr = currowwhile;
                variables2 = {};
                for (var key in variables) {
                  variables2[key] = variables[key];
                }     
                outputData[outputData.length] = [countStr,data[index], variables2, cur];
              }

            if (check) {
              cur = index + 1;
              continue;
            } else {
              cur += 1;
              continue;
            }

          } else if (ifCondition(data[index]) === true) {
            index = countStr;

        variables3 = {};
        for (var key in variables) {
        variables3[key] = variables[key];
        }           
        outputData[outputData.length] = [countStr,data[cur], variables3, cur];
            
            if (index + 1 != n && data[index + 1].search("else") != -1) {
              countStr = goBracket[index + 2] + 1;
              continue;
            } else {
              countStr = index + 1;
              continue;
            }
          } else if (data[index].search("else") != -1) {

        variables12 = {};
        for (var key in variables) {
        variables12[key] = variables[key];
        }          
        outputData[outputData.length] = [countStr,data[cur], variables12, cur];

            countStr += 1;
            continue;
          } else {
            countStr += 1;
            continue;
          }
        } else if (data[cur].search("begin") != -1) {
          if (data[cur] != "begin") {
            pushError(errors, "There's trouble with begin.");
            return null;
          }    


        variables4 = {};
        for (var key in variables) {
        variables4[key] = variables[key];
        }   
        outputData[outputData.length] = [countStr,data[cur], variables4, cur];

          cur += 1;
          continue;
        } else if (whileConstruction(data[cur])) {
          var check = checkWhileCondition(data[cur], variables);
          currowwhile = countStr;

           variables5 = {};
        for (var key in variables) {
          variables5[key] = variables[key];
        }   
          if (check == null) {
            pushError(errors, "Trouble with condition check in while construction.");
            return null;
          }
          if (cur + 1 == n ) {//
            pushError(errors, "End is too early.");
            return null;
          }
          if (check) {

        variables6 = {};
        for (var key in variables) {
        variables6[key] = variables[key];
        }    
        outputData[outputData.length] = [countStr, data[cur],variables6, cur];

            cur = cur + 1;
            continue;
          } else {
            cur = cur + 1;
            if (cur == n || data[cur] != "begin") {
              pushError(errors, "There's no begin after while construction.");
              return null;
            }

        variables7 = {};
        for (var key in variables) {
        variables7[key] = variables[key];
        }          

        outputData[outputData.length] = [countStr,data[cur], variables7, cur];

            cur = goBracket[cur] + 1;
            continue;
          }
        } else if (ifCondition(data[cur]) === true) {
          if (cur + 1 == n ) {// || data[cur + 1] != "begin"
            pushError(errors, "End is too early.");
            return null;
          }
          var check = checkIfCondition(data[cur], variables);

        variables8 = {};
        for (var key in variables) {
        variables8[key] = variables[key];
        }          
        outputData[outputData.length] = [countStr,data[cur], variables8, cur];

          if (check == null) {
            pushError(errors, "Trouble with condition check in while construction.");
            return null;
          }
          if (check == true) {
            cur += 1;
            continue;
          } else {
            cur += 1;
            cur = goBracket[cur];
            if (data[cur + 1] != "else") {

        variables9 = {};
        for (var key in variables) {
        variables9[key] = variables[key];
        }          
        outputData[outputData.length] = [countStr,data[cur], variables9, cur];

              cur += 1;
              continue;
            } else {
              cur += 2;
              continue;
            }
          }
        } else if (data[cur].search(":=") != -1) {
          var nArr = data[cur].split(' ');
          var m = nArr.length;
          if (m != 3 && m != 5) {
            pushError(errors, "Trouble in line with :=. Wrong number of values in line.");
            return null;
          }
          if (m == 3) {
            if (isNumber(nArr[0]) || nArr[0] == ":=") {
              pushError(errors, "First value must be a variable in := construction.");
              return null;
            }
            if (nArr[2] == ":=") {
              pushError(errors, "Second value must be a number in := construction.");
              return null;
            }
            var firstValue;
            if (isNumber(nArr[2])) {
              firstValue = toNumber(nArr[2]);
            } else if ((nArr[2] in variables)) {
              firstValue = variables[nArr[2]];
            } else {
              pushError(errors, "First value must be a variable in := construction.");
              return null;
            }
            if (!isVariable(nArr[0])) {
              pushError(errors, "First value must be a variable in := construction.");
              return null;
            }
            variables[nArr[0]] = firstValue;

        variables10 = {};
        for (var key in variables) {
        variables10[key] = variables[key];
        }
        outputData[outputData.length] = [countStr,data[cur], variables10, cur];

          } else {
            if (!isVariable(nArr[0])) {
              pushError(errors, "First value must be a variable in := construction.");
              return null;
            }
            if (!isOperation(nArr[3])) {
              pushError(errors, "Fourth value in := construction must be an operation.");
              return null;
            }

            var firstValue, secondValue;
            if (isNumber(nArr[2])) {
              firstValue = toNumber(nArr[2]);
            } else if (nArr[2] in variables) {
              firstValue = getValueOfVariable(nArr[2], variables);
            } else {
              pushError(errors, "Second value must be a variable in := construction.");
              return null;
            }

            if (isNumber(nArr[4])) {
              secondValue = toNumber(nArr[4]);
            } else if (nArr[4] in variables) {
              secondValue = getValueOfVariable(nArr[4], variables);
            } else {
              pushError(errors, "Fifth value must be a variable in := construction.");
              return null;
            }
            variables[nArr[0]] = makeOperation(nArr[3], firstValue, secondValue);

            variables11 = {};
            for (var key in variables) {
            variables11[key] = variables[key];
            }          
            outputData[outputData.length] = [countStr, data[cur], variables11, cur];

          } 
          cur += 1;
        } else {
          pushError(errors, "Trouble with input program.");
          return null;
        }
      }
  else{ 
            
            variables13 = {};
            for (var key in variables) {
            variables13[key] = variables[key];
            }          
            outputData[outputData.length] = [countStr, data[cur], variables13, cur];
            cur++;
   }
  }
  if (functionName in variables) {
    pushError(errors, "Function name is in variables.");
    return null;
  }
  return outputData;
}


