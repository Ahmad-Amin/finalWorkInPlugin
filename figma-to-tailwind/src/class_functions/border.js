const { borderRadiusMap, borderWidthMap } = require('../maps/map');
import {RGBToHex} from '../utils/util_functions';
import {colorMap} from '../maps/map';

export const getBorderRadiusClass = (node) => {
    
    let topLeft = node.topLeftRadius;
    let topRight = node.topRightRadius;
    let bottomRight = node.bottomRightRadius;
    let bottomLeft = node.bottomLeftRadius;

    if(!(topLeft || topRight || bottomRight || bottomLeft)){
        return '';
    }

    let isLarge = topLeft>'24'?true:false;

    //Case 1: All radii are equal
    if(topLeft == topRight && topLeft == bottomRight && topLeft == bottomLeft){
        if(isLarge){
            return `rounded-full`;
        }
        return `rounded${closedBorderRadius(topLeft)}`;
    }
    return ` border-tl${borderRadiusMap[topLeft]} border-tr${borderRadiusMap[topRight]} border-br${borderRadiusMap[bottomRight]} border-bl${borderRadiusMap[bottomLeft]}`;
}

const closedBorderRadius = (value) => {
    const devation = [] // This array will contains the deviation of the value from the borderRadiusMap to get the closet tailwind value (having lowest deviation)
    const radiusKeys = Object.keys(borderRadiusMap);
    radiusKeys.map(val => {
        devation.push(Math.abs(parseInt(value) - parseInt(val)));
    });
    let minValIndex = devation.indexOf(Math.min(...devation));
    return borderRadiusMap[radiusKeys[minValIndex]];
}

export const getBorderWidthClass = (node) => {
    //get the border width property from the API
    //it lies in strokes
    if(!node.strokes || node.strokes.length == 0){
        return '';
    }
    return `border${borderWidthMap[node.strokeWeight]}`;
}


export const getBorderColor = (node) => {
    if("strokes" in node){
        if(node.strokes.length > 0){
            let borderColor = node.strokes[0].color;
            return `border-${colorMap[RGBToHex(borderColor)]}`;
        }
    }
    
}

