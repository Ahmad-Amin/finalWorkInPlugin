//layouts
const { flexMap, justifyMap, alignMap } = require('../maps/layoutMaps');
const { pixelToTailwind } = require('../maps/map');
//flex
export const getValues = (node) => {
    let mode = node.layoutMode ? node.layoutMode : ''; // flex-row or flex-col
    let justify = node.primaryAxisAlignItems ? node.primaryAxisAlignItems : ''; // justify-items 
    let align = node.counterAxisAlignItems ? node.counterAxisAlignItems : ''; // align
    let paddingLeft = node.paddingLeft ? node.paddingLeft : ''; //padding between child and border
    let paddingRight = node.paddingRight ? node.paddingRight : '';
    let paddingTop = node.paddingTop ? node.paddingTop : '';
    let paddingBottom = node.paddingBottom ? node.paddingBottom : '';
    let spacing = node.itemSpacing ? node.itemSpacing : ''; // space between items

    //assuming that the paddings are equal - taking only one value    

    return {
        isFrame:node.type=='FRAME' || node.type=='COMPONENT'?true:false,
        mode,
        justify,
        align,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        spacing
    }
}

export const getTailWindClasses = (nodeObj) => {
    //takes in an object containing the values from the node
    //flex
    const flex = flexMap[nodeObj.mode];
    
    const justify = justifyMap[nodeObj.justify];
    const align = alignMap[nodeObj.align];
    const paddingLeft = getClosestPaddingValue(nodeObj.paddingLeft);
    const paddingRight = getClosestPaddingValue(nodeObj.paddingRight);
    const paddingTop = getClosestPaddingValue(nodeObj.paddingTop);
    const paddingBottom = getClosestPaddingValue(nodeObj.paddingBottom);

    // console.log("padding Value-->", paddingLeft, paddingRight, paddingTop, paddingBottom);
    const spacing = pixelToTailwind[nodeObj.spacing];

    if(nodeObj){
        // console.log(`${flex?flex:''} ${justify} ${align} pt-${paddingTop} pr-${paddingRight} pb-${paddingBottom} pl-${paddingLeft}`);
        return `${flex?flex:''} ${justify} ${align} ${paddingTop ? `pt-${paddingTop}` : ''} ${paddingRight ? `pr-${paddingRight}` : ''} ${paddingBottom ? `pb-${paddingBottom}` : ''} ${paddingLeft ? `pl-${paddingLeft}` : ''}`;
    }else{
        return '';
    }
}


const getClosestPaddingValue = (value) => {
    const closeArray = [];   // This will contain the deviation of the current width to the already presnet width, to get the closest value
    let keyCloseWidth = Object.keys(pixelToTailwind);

    keyCloseWidth.map(val => {
        if(val.indexOf('%') == -1 && val.indexOf('screen') == -1){   // Removing the Values with the % sign and screen (only want to use the closet pixel value)
            closeArray.push(Math.abs(value - val));
        }
    });

    var minValIndex = closeArray.indexOf(Math.min(...closeArray));
    const finalVal = pixelToTailwind[keyCloseWidth[minValIndex]];
    
    return finalVal;
    
}

export const getSpacingFromParent = (node) => {
    if(node.parent  && node.parent.children.length > 1){
        if(node.parent.children.indexOf(node) == node.parent.children.length - 1 && node.parent.children.length>1){//last node
            return '';
        }
        let itemSpacing;
        if(node.parent.primaryAxisAlignItems=='SPACE_BETWEEN'){
            return '';
        }
        if("parent" in node){
            if(node.parent.layoutMode == 'VERTICAL'){
                itemSpacing = node.parent.itemSpacing;
                return `mb-${pixelToTailwind[itemSpacing]}`;
            }else if(node.parent.layoutMode == 'HORIZONTAL'){
                itemSpacing = node.parent.itemSpacing;
                return `mr-${pixelToTailwind[itemSpacing]}`;
            }
        }
        return '';
    }else{
        return '';
    }
}
