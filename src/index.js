module.exports = function solveSudoku(matrix) {
  var finalMatrix=[];
  var totalRandomAttempt=-1;
  getFulfieledlMatrix(matrix,finalMatrix,totalRandomAttempt);
  return finalMatrix[0];
}
 
 //this function returns all possible results for every cell
 function getPossibleResults(matrixRes, row, col){
     var arrD=[1,2,3,4,5,6,7,8,9];
     //check col
      for(var k=0;k<matrixRes.length;k++){
        if(matrixRes[k][col]!==0){
           var index = arrD.indexOf(matrixRes[k][col]);
           if (index !== -1) arrD.splice(index, 1);
        }
      }
      
      if(arrD.length<2)
        return arrD;
     
      
      //check row
      for(k=0;k<matrixRes.length;k++){
        if(matrixRes[row][k]!==0){
           index = arrD.indexOf(matrixRes[row][k]);
           if (index !== -1) arrD.splice(index, 1);
        }
      }
      
       if(arrD.length<2)
        return arrD;
        
      //check square
      var kiStart=0;
      var kjStart=0;
      
      if(row<3) kiStart=0;
      else if(row>5) kiStart=6;
      else kiStart =3;
      
      if(col<3) kjStart=0;
      else if(col>5) kjStart=6;
      else kjStart =3;
      
      for(var ki=kiStart;ki<kiStart+3;ki++)
        for(var kj=kjStart;kj<kjStart+3;kj++){
          if(matrixRes[ki][kj]!==0){
             index = arrD.indexOf(matrixRes[ki][kj]);
             if (index !== -1) arrD.splice(index, 1);         
          }
        }
      
     return arrD;
 }
 
 
 function checkCorrectMatrix(finalMatrix){
   //get list all created matrix and return first correct
 
   for(var i=0;i<finalMatrix.length;i++){
     if(isMatrixCorrect(finalMatrix[i])){
       return finalMatrix[i];
     }
   }
   
 }
 function isMatrixCorrect(matrixChecked){
   
   var isRes=true;
   
   //check all rows
   for(var i=0;i<matrixChecked.length;i++){
     var arrD=[1,2,3,4,5,6,7,8,9];
     for(var j=0;j<matrixChecked[i].length;j++){
             index = arrD.indexOf(matrixChecked[i][j]);
             if (index !== -1) arrD.splice(index, 1);  
     }
     if(arrD.length>0){
       isRes=false;
       break;
     }
   }
 
   
   //check all colums
   if(isRes){
   for(var i=0;i<matrixChecked.length;i++){
     var arrD=[1,2,3,4,5,6,7,8,9];
     for(var j=0;j<matrixChecked[i].length;j++){
             index = arrD.indexOf(matrixChecked[j][i]);
             if (index !== -1) arrD.splice(index, 1);  
     }
     if(arrD.length>0){
       isRes=false;
       break;
     }
   }
   }
 
   //check all scruare
   if(isRes) isRes=squareCheck(matrixChecked,0,0);
   if(isRes) isRes=squareCheck(matrixChecked,0,3);
   if(isRes) isRes=squareCheck(matrixChecked,0,6);
   if(isRes) isRes=squareCheck(matrixChecked,3,0);
   if(isRes) isRes=squareCheck(matrixChecked,3,3);
   if(isRes) isRes=squareCheck(matrixChecked,3,6);
   if(isRes) isRes=squareCheck(matrixChecked,6,0);
   if(isRes) isRes=squareCheck(matrixChecked,6,3);
   if(isRes) isRes=squareCheck(matrixChecked,6,6);  
  // console.log(isRes);
   return isRes;
 }
 function squareCheck(matrixChecked,indexStartI, indexStartJ){
   var arrD=[1,2,3,4,5,6,7,8,9];
   for(var i=indexStartI;i<indexStartI+3;i++){
     for(var j=indexStartJ;j<indexStartJ+3;j++){
             index = arrD.indexOf(matrixChecked[i][j]);
             if (index !== -1) arrD.splice(index, 1);  
     }
   }
   return (arrD.length==0);
 }
 
 function getFulfieledlMatrix(matrix,finalMatrix,totalRandomAttempt){
   // your solution
 
   var matrixRes=[];
   for(var i=0;i<matrix.length;i++){
     matrixRes[i]=matrix[i].slice();
   }
  
  var arrRandVal=[];
 
  //do some iteration 
  for(var it=0;it<20;it++){
   // get possible results for every 0 value
    if(finalMatrix.length>0)
    break;

   var evalRes=[];
   var isResInIteration=false;
   for(var i=0;i<matrixRes.length;i++){
     evalRes[i]=[];
     for(var j=0;j<matrixRes[i].length;j++){
       if(matrixRes[i][j]==0)
            evalRes[i][j]=getPossibleResults(matrixRes,i,j);
       else{
         evalRes[i][j]=[];
       }
     }
   }
   //console.log(evalRes);
 
   //check evalRes - in case possible result contain only 1 possible value, add it to matrixRes;
   for(var i=0;i<evalRes.length;i++){
     for(var j=0;j<evalRes[i].length;j++){
       if(evalRes[i][j].length==1){
         matrixRes[i][j]=evalRes[i][j][0];
         isResInIteration=true;
         //console.log(it+":"+i+" "+j+"  "+evalRes[i][j][0]);
       }
     }
   }
   
   if(!isResInIteration){
     //if iteration is empty find cell with mininum possible value and take first value as possible;
      var minLenIndexI=-1;
      var minLenIndexJ=-1;
      for(var i=0;i<evalRes.length;i++)
       for(var j=0;j<evalRes[i].length;j++){
        if(evalRes[i][j].length>1){
          if(minLenIndexI==-1){
            minLenIndexI=i;
            minLenIndexJ=j;
          } else{
            if(evalRes[i][j].length<evalRes[minLenIndexI][minLenIndexJ].length){
              minLenIndexI=i;
              minLenIndexJ=j;
            }
          }
        }
      }
      
      if(minLenIndexI!=-1 && totalRandomAttempt<9){
        //console.log(matrixRes);
        //console.log('random index '+minLenIndexI+"  "+minLenIndexJ+" "+evalRes[minLenIndexI][minLenIndexJ][0]);
        for(var i=0;i<evalRes[minLenIndexI][minLenIndexJ].length;i++){
         // console.log(evalRes[minLenIndexI][minLenIndexJ].length+"   "+minLenIndexI+"   "+minLenIndexJ);
         matrixRes[minLenIndexI][minLenIndexJ]=evalRes[minLenIndexI][minLenIndexJ][i];
        //console.log(matrixRes);
         getFulfieledlMatrix(matrixRes,finalMatrix,(++totalRandomAttempt));
        }
      }
     
   }
   
  }
 
   if(isMatrixCorrect(matrixRes) && finalMatrix.length==0)
          finalMatrix.push(matrixRes);
 }
 
 