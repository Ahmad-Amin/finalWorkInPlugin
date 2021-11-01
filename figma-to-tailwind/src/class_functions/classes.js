const  { colorMap,
    pixelToTailwind,
    fontPixelToTailwind,
    maxWidthPixelToTailwind,
    fontWeightMap, 
    fractionalPixelHaystack,
    rotateMap } = require('../maps/map');

const {RGBToHex} = require('../utils/util_functions');

import { boxShadowMap } from '../maps/boxShadow';

export const getBGColor = (node) => { 
    let bgColor, bgColorString;
    if(node.type != 'GROUP'){
        if(node.fills){
            if(node.fills.length>0){
                bgColor = node.fills[0].color;
                bgColorString = JSON.stringify(bgColor);
                return `bg-${colorMap[RGBToHex(bgColor)]}`;
            }
        }else{  
            return '';
        }
    }
    return '';
}

const getFractionalWidth = (node) => {
    //---WIDTH---
    //only execute if the width/height > 384
    // if(node.width<=384) return '';


    let parentWidth, width, nodeStartWidth, nodeEndWidth, widthPercentage;
    if(node.parent){
        parentWidth = node.parent.width;
    }
    width = node.width;
    // height = node.height;
    //calculate the width and height percentage
    widthPercentage = ((width/parentWidth).toFixed(2)*100);
    // console.log(widthPercentage);

    for(let i=0; i<fractionalPixelHaystack.length; i++){
        if(fractionalPixelHaystack[i] >= widthPercentage){
            widthPercentage = fractionalPixelHaystack[i];
            break;
        }
    }
     
    widthPercentage += '%';

    let string;
    if(pixelToTailwind[widthPercentage]){
        string = `w-${pixelToTailwind[widthPercentage]}`
    }
    else{
        if(node.parent.type == "PAGE"){
            let maxWidth = checkForMaxWidth(width);
            if(maxWidth != false){
                string = `${maxWidth}`;
                return string;
            }
        }
    
        string = 'w-full';
    }

    return string;
}

function checkForMaxWidth(width){
    // if(width < 448){return false}
    let nodeWidth = width;
    let valueDeviation = [];
    // Checking the closest key from Max-width with respect to the width given;
    if(width <= 1280){
        let keysMaxWidth = Object.keys(maxWidthPixelToTailwind);
        keysMaxWidth.map(val => {
            valueDeviation.push(Math.abs(parseInt(val) - parseInt(nodeWidth)));
        });
        let finalIndex = valueDeviation.indexOf(Math.min(...valueDeviation));

        return maxWidthPixelToTailwind[keysMaxWidth[finalIndex]];
    }

    return false;
}

export const getWidth = (node) => {
    if("width" in node){
        let w = Math.round(node.width, 1);
        if(w > 384){
            return getFractionalWidth(node);
        }else if(w <= 384){
            // const retValue = pixelToTailwind[w] ? pixelToTailwind[w] : `auto`;
            // return `w-${retValue}`;
            let val = closestPossibleTailwind(w);
            return `w-${val}`;

        }
    }
    
    return ``;
}

const closestPossibleTailwind = (value) => {
    const closeArray = [];   // This will contain the deviation of the current width to the already presnet width, to get the closest value
    let keyCloseWidth = Object.keys(pixelToTailwind);
    keyCloseWidth.map(val => {
        if(val.indexOf('%') == -1 && val.indexOf('screen') == -1){   // Removing the Values with the % sign and screen (only want to use the closet pixel value)
            closeArray.push(Math.abs(value - val));
        }
    });

    var minValIndex = closeArray.lastIndexOf(Math.min(...closeArray));
    const finalVal = pixelToTailwind[keyCloseWidth[minValIndex]];
    return `${finalVal}`;
}

export const getHeight = (node) => {
    if("height" in node){
        let h = Math.round(node.height, 1);
        if(h>384){
            return ``;
        }else if(h<=384){
            let val = closestPossibleTailwind(h);
            return `h-${val}`;
        }
    }
    return ``;
}

export const getRotateValue = (node) => {
    if('rotation' in node){
        let val = parseInt(node.rotation);
        if(val != 0){
            return `origin-top-right transform -${rotateMap[val]}`;
        }
    }
}

//function for layouts of containers
export const getLayout = (node) => {
    let flex;
    let flexClasses = '';
    let layout = node.layoutMode;//gives vertical or horizontal
    if(layout){
        flexClasses=layout=='VERTICAL'?'flex flex-col items-center justify-center flex-wrap':'flex items-center justify-center flex-wrap';
        return flexClasses;
    }else {
        return '';
    }
}

//function for paddings
//TODO
export const getPadding = (node) => {
    let paddingX, paddingY;
    if(node && node.parent.children[1]){
        paddingX = node.parent.children[1].x - node.x; 
        // i.e. it acts like a container
    } 
    if(node.parent.children[1] && node){
        paddingY = node.parent.children[1].y - node.y ;
    }
    return `px-${pixelToTailwind[paddingX]?pixelToTailwind[paddingX]:''} py-${pixelToTailwind[paddingY]?pixelToTailwind[paddingY]:''}`;
}

export const textClasses = (node) => {
    // console.log(node.fills)
    let textColor;
    let textColorString;
    if(node.fills.length>0){
        textColor = node.fills[0].color;//gives an RGB value
        textColorString = JSON.stringify(textColor);
    }

    let fontSize = node.fontSize;
    let fontWeight;
    if(node.fontName){
        fontWeight = node.fontName.style?node.fontName.style:'';
    }

    //text align horizontal
    let horizontalAlignString = '';
    let horizontalAlignValue = node.textAlignHorizontal;
    switch(horizontalAlignValue){
        case 'LEFT':
            horizontalAlignString = 'text-left';
            break;
        case 'CENTER':
            horizontalAlignString = 'text-center';
            break;
        case 'RIGHT':
            horizontalAlignString = 'text-right';
            break; 
        default:
            horizontalAlignString = '';
    }

    //line height
    let lineHeightValue = node.lineHeight.value;
    let lineHeightString = pixelToTailwind[lineHeightValue];

    return `text-${colorMap[RGBToHex(textColor)]} ${fontPixelToTailwind[fontSize]} ${fontWeightMap[fontWeight]} ${horizontalAlignString} leading-${lineHeightString}`;
}

export const getPlaceholderColor = (node) => {
    let pHColor;
    if(node.fills.length > 0){
        pHColor = node.fills[0].color;  // It gives the RGB color from Figma Design
        return `placeholder-${colorMap[RGBToHex(pHColor)]}`;
    }
}

//box shadow function
export const getBoxShadow = (node) => {
    //getting all the properties from the node to create a string and then mapping those properties to a single tailwind class
    let shadowEffectArray = [];
    if(node.effects){
        node.effects.forEach((effect, index) => {
            if(effect.type == 'DROP_SHADOW'){
                shadowEffectArray.push(effect);
            }
        });
    }
    // const shadowObject = node.effects[shadowEffectIndex];
    let shadowClassString = '';
    let shadowClass = '';
    shadowEffectArray.forEach(eff => {
            //properties
            //color is always 0 0 0 -> black
            let xOffset = eff.offset.x;
            let yOffset = eff.offset.y;
            let spread = eff.spread;
            let blur = eff.radius;
            let opacity = Math.round(eff.color.a * 100, 1)/100;
        
            shadowClassString = `${xOffset}_${yOffset}_${blur}_${spread}_${opacity}`;
    
            let howMuchClose = [];
            const ShadowKeys = Object.keys(boxShadowMap);

            ShadowKeys.map((v, i)=>{
                let result = closestPossibleShadow(shadowClassString, v);
                howMuchClose.push(result);
            })

            const finalIndex = howMuchClose.indexOf(Math.min(...howMuchClose));
            shadowClass =  boxShadowMap[ShadowKeys[finalIndex]];

    })
    return shadowClass;
}

export const closestPossibleShadow = (shadowClassString, v) => {
    let figmaShadowArray = shadowClassString.split('_');
    let tailwindShadowMap = v.split('_');
    let val = 0 
    for(let i=0; i<tailwindShadowMap.length; i++){
        val = val + (parseFloat(figmaShadowArray[i]) - parseFloat(tailwindShadowMap[i]));
    }
    return Math.abs(val);
}

