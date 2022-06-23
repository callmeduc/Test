/**
 * Input:  [[6,5,4], [9,8,7], [3,2,1]]
 * TODO: output [[1,2,3],[4,5,6],[7,8,9]]
 */
 const matrix = [[6,5,4], [9,8,7], [3,2,1]]
 var temp =[]
 function mat(matrix){
     let k =0
     for (let a = 0; a < matrix[0].length; a++) {
         for (let b = 0; b < matrix.length; b++) {
             temp[k++] = matrix[a][b];
         }
     }
     return temp
 }
//  console.log(mat(matrix))
 mat(matrix)
 temp.sort()
//  console.log(temp)
 
 k = 0;
 for (let i = 0; i < 3; i++){
     for (let j = 0; j < 3; j++){
         matrix[i][j] = temp[k++];
     }
         
 }
console.log(matrix)


/**
 * Time Complexity: O(n^2logn). 
 * Auxiliary Space: O(n2).
 */