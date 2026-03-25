// Problem: 2096 (Leetcode) - Constant Product Matrix, Daily Challenge 2026-03-24

// Solution Status: Submitted at Mar 25, 2026 13:16 NZST, Beats 85.71% of solutions for run-time and 14.29% for Memory

/* Problem Description:
*    Given a 0-indexed 2D integer matrix grid of size n * m, we define a 0-indexed 2D matrix p of size n * m as the product matrix of grid if the following condition is met:
*    
*    Each element p[i][j] is calculated as the product of all elements in grid except for the element grid[i][j]. This product is then taken modulo 12345.
*    Return the product matrix of grid.
*    
*    
*    
*    Example 1:
*    
*    Input: grid = [[1,2],[3,4]]
*    Output: [[24,12],[8,6]]
*    Explanation: p[0][0] = grid[0][1] * grid[1][0] * grid[1][1] = 2 * 3 * 4 = 24
*    p[0][1] = grid[0][0] * grid[1][0] * grid[1][1] = 1 * 3 * 4 = 12
*    p[1][0] = grid[0][0] * grid[0][1] * grid[1][1] = 1 * 2 * 4 = 8
*    p[1][1] = grid[0][0] * grid[0][1] * grid[1][0] = 1 * 2 * 3 = 6
*    So the answer is [[24,12],[8,6]].
*    Example 2:
*    
*    Input: grid = [[12345],[2],[1]]
*    Output: [[2],[0],[0]]
*    Explanation: p[0][0] = grid[0][1] * grid[0][2] = 2 * 1 = 2.
*    p[0][1] = grid[0][0] * grid[0][2] = 12345 * 1 = 12345. 12345 % 12345 = 0. So p[0][1] = 0.
*    p[0][2] = grid[0][0] * grid[0][1] = 12345 * 2 = 24690. 24690 % 12345 = 0. So p[0][2] = 0.
*    So the answer is [[2],[0],[0]].
*    
*    
*    Constraints:
*    
*    1 <= n == grid.length <= 105
*    1 <= m == grid[i].length <= 105
*    2 <= n * m <= 105
*    1 <= grid[i][j] <= 109
*/

// Solution:
/**
 * @param {number[][]} grid - The input 2D integer matrix for which we need to construct the product matrix.
 * @return {number[][]} - The product matrix of the input grid, where each element is the product of all other elements in the grid modulo 12345.
 * 
 * Division should not be used in the solution as it can lead to issues with the modulo operation, instead we can avoid division in this problem 
 * by calculating the suffix and prefix products of each element, where the prefix product is the product of every element before the element, and the
 * suffix product is the product of everything after it. Therefore multiplying the prefix and suffix products of an element give the product of 
 * every element in the grid expect that element. 
 */
var constructProductMatrix = function(grid) {
    // Initialising important constants and variables
    const modValue = 12345;
    const gridLength = grid.length;
    const gridHeight = grid[0].length; // As the grid has a size of n * m, all heights (i.e., length of sub-arrays) are the same
    const flatGrid = grid.flat(); // Flatten 2-D grid to calculate prefix and suffix product arrays easier
    const flatGridLength = flatGrid.length;

    let prefixProductArray = new Array(flatGridLength).fill(1);
    let suffixProductArray = new Array(flatGridLength).fill(1);
    let productMatrix = Array.from(Array(gridLength), () => new Array(gridHeight));

    // Build prefix products: product of all values before index i.
    for (let i = 1; i < flatGridLength; i++) {
        prefixProductArray[i] = (prefixProductArray[i - 1] * (flatGrid[i - 1] % modValue)) % modValue;
    }

    // Build suffix products: product of all values after index i.
    for (let i = flatGridLength - 2; i >= 0; i--) {
        suffixProductArray[i] = (suffixProductArray[i + 1] * (flatGrid[i + 1] % modValue)) % modValue;
    }

    // Convert flat index back to 2-D index and populate answer matrix.
    for (let i = 0; i < flatGridLength; i++) {
        let gridLengthIndex = Math.floor(i / gridHeight);
        let gridHeightIndex = i % gridHeight;

        productMatrix[gridLengthIndex][gridHeightIndex] = (prefixProductArray[i] * suffixProductArray[i]) % modValue;
    }

    return productMatrix;
};

function runTestCases() {
    const testCases = [
        // Status = Passed
        {
            input: [[1,2],[3,4]],
            expected: [[24,12],[8,6]]
        },
        // Status = Passed
        {
            input: [[12345],[2],[1]],
            expected: [[2],[0],[0]]
        },
        // Status = Passed
        {
            input: [[8,18],[24,20],[9,5],[26,26],[19,19],[20,1],[20,23],[15,19],[24,14],[12,15],[22,3],[22,11],[9,25]],
            expected: [[11625,3795],[12105,4650],[7590,6255],[8325,8325],[4245,4245],[4650,6585],[4650,2970],[2085,4245],[12105,10170],[11865,2085],[3105,10425],[3105,6210],[7590,3720]]
        }
    ];

    testCases.forEach(({input, expected}, index) => {
        const result = constructProductMatrix(input);
        console.log(`Test Case ${index + 1}:`, JSON.stringify(result) === JSON.stringify(expected) ? 'Passed' : 'Failed');
    });
}

// Run the test cases to validate the solution
runTestCases();