# SiplLanguageProject
Basicly, it\`s a project which works with very simplified language. Actually, it\`s a pseudo-language called SIPL.
This project builds the tree and shows imitation work of input program. <br />
<br />

SIPL works only with integers, so you don\`t need to declare any variable types. <br />
<br />

Operations, supported by SIPL:\n<br />
1. arithmetic operatioins (+,-,*,/);<br />
2. 1 loop operator(while ... do);<br />
3. if statement operator(if ... else);<br />
4. begin-end construction;<br />
5. compare operators(>,>=,<,<=<=,==,!=). required spaces around this operator <br />
6. assign operator(:=);<br />

Program must starts with function declaration:<br />
  PROGRAMNAME(paramA,paramB)<br />
Work example: <br />
  SUM(a,b)<br />
<br />
Every while-construction must look like this:<br />
 while condition do<br />
    begin<br />
    ...<br />
    end<br />
Work example:<br /> 
  while a >= b do<br />
    begin<br />
      a := a - b;<br />
    end<br />
<br />
After assignment line user must put ';'<br />
<br />
Input values line must look like this:<br />
  paramA: value1, paramB:value2<br />
Work example: <br />
  a : 3, b : 2<br />
  <br />
<br />
HOW DOES THIS PROJRCT WORKS?<br />
1. Type in the program text inside the text area;<br />
2. Type in input values;<br />
3. Press 'Build tree button';<br />
4. Press 'Imitate button' to imitate program work at each step;<br />
<br />
In output line you will see variable/`s values at each step;
