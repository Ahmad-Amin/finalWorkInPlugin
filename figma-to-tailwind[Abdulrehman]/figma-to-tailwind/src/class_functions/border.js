const { borderRadiusMap, borderWidthMap } = require('../maps/maps')

//border radius
function getBorderRadiusClass(node){
    //the classes need to be like rounded-bl-3xl - rounded-md
    let topLeft = node.topLeftRadius;
    let topRight = node.topRightRadius;
    let bottomRight = node.bottomRightRadius;
    let bottomLeft = node.bottomLeftRadius;
    // console.log("_________", topLeft, topRight, bottomRight, bottomLeft)
    if(!(topLeft || topRight || bottomRight || bottomLeft)){
        return '';
    }

    let isLarge = topLeft>'24'?true:false;

    //Case 1: All radii are equal
    if(topLeft == topRight && topLeft == bottomRight && topLeft == bottomLeft){
        // console.log('')
        if(isLarge){
            return `rounded-full`;
        }
        return `rounded${borderRadiusMap[topLeft]}`;
    }
    // //Case 2: 2 of them are equal (2 pairs of equal radii -- adjacent)

    //     //A: top 2 are equal 
    //     //B: right 2 are equal
    //     //C: bottom 2 are equal
    //     //D: left 2 are equal
    // //Case 3: 2 adjecent are equal -- remaining 2 are unique
    // //Case 4: none of them are equal
    // if(topLeft != topRight != bottomRight != bottomLeft){

    // }

    return `border-tl${borderRadiusMap[topLeft]} border-tr${borderRadiusMap[topRight]} border-br${borderRadiusMap[bottomRight]} border-bl${borderRadiusMap[bottomLeft]}`;
}

function getBorderWidthClass(node){
    //get the border width property from the API
    //it lies in strokes
    if(!node.strokes || node.strokes.length == 0){
        return '';
    } 
    return `border${borderWidthMap[node.strokeWeight]}`;
}

module.exports = {
    getBorderRadiusClass,
    getBorderWidthClass
}