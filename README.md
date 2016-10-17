# SiplLanguageProject
Basicly, it`s a project which works with very simplified language. Actually, it`s a pseudo-language called SIPL.
This project builds the tree and shows imitation work of input program. 

SIPL works only with integers, so you don`t need to declare any variable types. 

Operations, supported by SIPL:
1. arithmetic operatioins (+,-,*,/);
2. 1 loop operator(while ... do);
3. if statement operator(if ... else);
4. begin-end construction;
5. compare operators(>,>=,<,<=<=,==,!=). required spaces around this operator 
6. assign operator(:=);

Program must starts with function declaration:
  PROGRAMNAME(paramA,paramB)
Work example: 
  SUM(a,b)

Every while-construction must look like this:
 while condition do
    begin
    ...
    end
Work example: 
  while a >= b do
    begin
      a := a - b;
    end

After assignment line user must put ';'

Input values line must look like this:
  paramA: value1, paramB:value2
Work example: 
  a : 3, b : 2
  

HOW DOES THIS PROJRCT WORKS?
1. Type in the program text inside the text area;
2. Type in input values;
3. Press 'Build tree button'
4. Press 'Imitate button' to imitate program work at each step;

In output line you will see variable`s values at each step;
