function loadTree(){
    var ans = getData();
    var data1 = ans.data1;
    treeData = draw(data1);
} 

var i = 1 ;

function Imitate(){
  var ans = getData();
  var data1 = ans.data1;
  var data = ans.data;
  while  ( i < data.length){
    var temp = data[i].name;
      if (temp.length <= 2 || temp == "while"){
        i++;
        continue;
      }
      else {
      data1[data[i].cur].value = data[i].value;
      data1[data[i].cur].level = "orange";
      draw(data1);
      var a = data[i].value;
      var output = "";
      for(var key in a){
        output += key +" : " + a[key] + "   ";
      }
      document.getElementById("outputText").value = output;

    i++;
    return;
    }
  }
}

function autoFillDiv(){
  d3.select("svg").remove();
  document.getElementById("outputText").value = "";
  var programText = document.getElementById("programText");
  var inputValues = document.getElementById("inputText");
  programText.value = "DIV(A,B)\n  begin\n  Q := 0;\n  R := A;\n  while R >= B do\n    begin\n    Q := Q + 1;\n    R := R - B;\n    end\n  end" ;
  inputValues.value = "A : 13, B : 3";
  var ans = getData();
  i = 1;
  ans.data = [];
  ans.data1 = [];
}

function autoFillSum(){
  d3.select("svg").remove();
  document.getElementById("outputText").value = "";
  var programText = document.getElementById("programText");
  var inputValues = document.getElementById("inputText");
  programText.value = "SUM(N)\n  begin\n  I := 0;\n  F := 1;\n  R := 1;\n  while I != N do\n    begin\n    I := I + 1;\n    F := F * I;\n    R := R + F\n    end\n  end" ;
  inputValues.value = "N : 5";
  i = 1;
  var ans = getData();
  ans.data = [];
  ans.data1 = [];
}