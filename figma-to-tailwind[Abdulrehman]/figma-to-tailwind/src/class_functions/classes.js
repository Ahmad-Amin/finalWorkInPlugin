const {
  colorMap,
  pixelToTailwind,
  fontPixelToTailwind,
  fontWeightMap,
  fractionalPixelHaystack,
} = require("../maps/maps");

const { RGBToHex } = require("../utils/util_functions");

const { boxShadowMap } = require("../maps/boxShadow");

function getBGColor(node) {
  let bgColor, bgColorString;
  if (node.type != "GROUP") {
    // console.log(node.type)
    if (node.fills) {
      if (node.fills.length > 0) {
        bgColor = node.fills[0].color;
        bgColorString = JSON.stringify(bgColor);
        return `bg-${colorMap[RGBToHex(bgColor)]}`;
      }
    } else {
      return "";
    }
  }
  return "";
}

const getFractionalWidth = (node) => {
  //---WIDTH---
  //only execute if the width/height > 384
  if (node.width <= 384) return "";
  // if(node.height<=384) return '';
  //width of the parent
  //width of the node
  //starting position of the node
  //ending position of the node
  let parentWidth, width, nodeStartWidth, nodeEndWidth, widthPercentage;
  // parentHeight, height, nodeStartHeight, nodeEndHeight, heightPercentage;
  if (node.parent) {
    parentWidth = node.parent.width;
    // parentHeight = node.parent.height;
  }
  width = node.width;
  // height = node.height;
  //calculate the width and height percentage
  widthPercentage = (width / parentWidth).toFixed(2) * 100;
  // heightPercentage = ((height/parentHeight).toFixed(2)*100);

  // console.log('old perc w', widthPercentage);
  // console.log('old perc h', heightPercentage);

  widthPercentage = fractionalPixelHaystack.reduce((a, b) => {
    return Math.abs(a - widthPercentage) < Math.abs(b - widthPercentage)
      ? a
      : b;
  });
  // heightPercentage = fractionalPixelHaystack.reduce( (a, b) => {
  //     return Math.abs(a - heightPercentage) < Math.abs(b - heightPercentage) ? a : b;
  // })

  // console.log('new perc w', widthPercentage);
  // console.log('new perc h', heightPercentage);

  widthPercentage += "%";
  // heightPercentage += '%';

  // console.log(width, parentWidth, widthPercentage);
  // console.log(height, parentHeight, heightPercentage);

  //calculate the margins TODO
  let string;
  if (pixelToTailwind[widthPercentage]) {
    string = `w-${pixelToTailwind[widthPercentage]}`;
  } else {
    string = "w-full";
  }
  // if(node.fills){
  //     if(node.fills.length>0){
  //         let bgColor = node.fills[0].color;
  //         let bgColorString = JSON.stringify(bgColor);
  //         string += ` bg-${colorMap[RGBToHex(bgColor)]}`;
  //     }
  // }
  return string;
};

function getWidth(node) {
  let w = Math.round(node.width, 1);
  if (w > 384) {
    return getFractionalWidth(node);
  } else if (w <= 384) {
    return pixelToTailwind[w] ? `w-${pixelToTailwind[w]} ` : "";
  }
  return ``;
}

function getHeight(node) {
  let h = Math.round(node.height, 1);
  if (h > 384) {
    // return getFractionalHeight(node);
    return ``;
  } else if (h <= 384) {
    return pixelToTailwind[h] ? `h-${pixelToTailwind[h]} ` : "";
  }
  return ``;
}

//function for layouts of containers
function getLayout(node) {
  let flex;
  let flexClasses = "";
  let layout = node.layoutMode; //gives vertical or horizontal
  if (layout) {
    flexClasses =
      layout == "VERTICAL"
        ? "flex flex-col items-center justify-center"
        : "flex items-center justify-center";
    return flexClasses;
  } else {
    return "";
  }
}

//function for paddings
//TODO
function getPadding(node) {
  let paddingX, paddingY;
  if (node && node.parent.children[1]) {
    paddingX = node.parent.children[1].x - node.x;
    // i.e. it acts like a container
  }
  if (node.parent.children[1] && node) {
    paddingY = node.parent.children[1].y - node.y;
  }
  return `px-${pixelToTailwind[paddingX] ? pixelToTailwind[paddingX] : ""} py-${
    pixelToTailwind[paddingY] ? pixelToTailwind[paddingY] : ""
  }`;
}

// function for margins
function getMargin(node) {
  //function for frames
  // let marginX, marginY;
  // //this margin is in the case when only one child
  // marginX = node.x - node.parent.x;
  // // marginXRight = node.parent.width - node.width - node.x;
  // marginY = node.y - node.parent.y;
  // return `mx-${pixelToTailwind[marginX]?pixelToTailwind[marginX]:''} my-${pixelToTailwind[marginY]?pixelToTailwind[marginY]:''}`;
  if (node.parent.chilren.length > 1) {
    //more than one child
  }
}

//TODO
// function getBorderRadius(node){
//     let radius = node.topLeftRadius;//assuming that all the radii are equal ... value in px
//     if (radius){
//         return borderRadiusMap[radius];
//     }
//     return '';
// }

function textClasses(node) {
  // console.log(node.fills)
  let textColor;
  let textColorString;
  if (node.fills.length > 0) {
    textColor = node.fills[0].color; //gives an RGB value
    textColorString = JSON.stringify(textColor);
    // console.log(textColorString)
  }

  let fontSize = node.fontSize;
  let fontWeight;
  if (node.fontName) {
    fontWeight = node.fontName.style ? node.fontName.style : "";
  }

  //text align horizontal
  let horizontalAlignString = "";
  let horizontalAlignValue = node.textAlignHorizontal;
  switch (horizontalAlignValue) {
    case "LEFT":
      horizontalAlignString = "text-left";
      break;
    case "CENTER":
      horizontalAlignString = "text-center";
      break;
    case "RIGHT":
      horizontalAlignString = "text-right";
      break;
    default:
      horizontalAlignString = "";
  }

  //line height
  let lineHeightValue = node.lineHeight.value;
  let lineHeightString = pixelToTailwind[lineHeightValue];

  return `text-${colorMap[RGBToHex(textColor)]} ${
    fontPixelToTailwind[fontSize]
  } ${
    fontWeightMap[fontWeight]
  } ${horizontalAlignString} leading-${lineHeightString}`;
}

//box shadow function
function getBoxShadow(node) {
  //getting all the properties from the node to create a string and then mapping those properties to a single tailwind class
  let shadowEffectArray = [];
  if (node.effects) {
    node.effects.forEach((effect, index) => {
      if (effect.type == "DROP_SHADOW") {
        shadowEffectArray.push(effect);
      }
    });
  }
  // const shadowObject = node.effects[shadowEffectIndex];
  let shadowClassString = "";
  let shadowClass = "";
  shadowEffectArray.forEach((eff) => {
    //properties
    //color is always 0 0 0 -> black
    let xOffset = eff.offset.x;
    let yOffset = eff.offset.y;
    let spread = eff.spread;
    let blur = eff.radius;
    let opacity = Math.round(eff.color.a * 100, 1) / 100;

    shadowClassString = `${xOffset}_${yOffset}_${blur}_${spread}_${opacity}`;
    // console.log(shadowClassString)
    if (Object.keys(boxShadowMap).includes(shadowClassString)) {
      shadowClass = boxShadowMap[shadowClassString];
    }
  });
  return shadowClass;
}

module.exports = {
  getBGColor,
  getFractionalWidth,
  getWidth,
  getHeight,
  getLayout,
  textClasses,
  getPadding,
  getMargin,
  getBoxShadow,
};
