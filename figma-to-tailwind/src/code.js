// I hope that you had already read the documentation for this plugin.
// To start understanding the structure of the code, Start reading the Code from around line 200 onwards

// figma.showUI(***) 


import {getValues, getTailWindClasses, getSpacingFromParent} from './class_functions/layout';

const { getBorderRadiusClass,
    getBorderWidthClass,
    getBorderColor } = require('./class_functions/border');        

import { getBGColor, getWidth,getRotateValue, getHeight, getBoxShadow, textClasses, getLayout, getPlaceholderColor } from './class_functions/classes';
import {getbreakPointsData, getDataFromPlugin, removeDataFromTree, createInteractionsString, addedCustomInteractions, createBreakPointString, changingBPStringToObj, changedBreakpoints, createCustomTailwindString, iskeyInObject, addedCustomClasses, setTagName, addedTagName} from './utils/ui_functions';   //importing the functions from the ui_functions file;
import {RGBToHex} from './utils/util_functions';


// Global Variables
let traverseIds = [];
let codeString = "";
let bpValue, customTailwindValue, customTag, customInteractionValue;


// function to Remove the Garbage Values from the Interactions Tab
const removeGarbageInteractions = (val) => {
    let valArray = val.split(' '), finalArray = [];
    valArray.map((v, i) => { v.length <= 2 ? valArray.splice(i, 1) : null;})
    
    for(let i=0; i<valArray.length; i++){
        const ele = valArray[i];
        if(ele.indexOf(':') != (ele.length - 1)){
            finalArray.push(valArray[i]);
        }
    }
    return finalArray.join(' ');
}

const pHStyles = (node) => {
    let child = node.children;
    let phStyle, textNode;
    child.map(x => {
        if(x.type == 'TEXT'){
            phStyle = `${getPlaceholderColor(x)}`;
            textNode = x;
        }
    });
    return [textNode, phStyle];
}

const pHValue = (node) => {
    return node.characters.split('\n').join('&lt/br&gt');
}

// This will iterate through all the layers and generate the html code from it
const createCode = (node) => {
    if(!node){return};
    if(node.visible == false) {return;}

    let indent = '';
    let classString = '';

    let tag = getDataFromPlugin(node, 'CUSTOM_TAGS');
    let userTag = `${tag ? tag : 'div'}`;    // If user set any kind of tag, then use it otherwise use the standard div tag

    let placeholderStyles = '';     // variable which holds the styling when the parent tag is an INPUT FIELD
    let placeholderValue = '';      // variable which holds the value [placeholder value], when the parent Tag is an INPUT FIELD
    if(userTag === 'input'){    // if the user Tag is input then take the placeholder value and styles for placeholder
        const [textNode, phStyle] = pHStyles(node);  // function is returning textNode (child node input Tag) and styles for that node
        placeholderValue = pHValue(textNode);   // Extracting the text from the textNode
        placeholderStyles = phStyle+' '+textClasses(textNode);  // Concatenate the placeholder styles
    }

    if('children' in node){
        
        let children = node.children;

        // cheking if the node is an imageNode
        if("fills" in node){
            if(node.fills.length >= 1){
                if(node.fills[0].type == "IMAGE"){
                    let imgH = node.height;
                    let imgW = node.width;
    
                    classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBoxShadow(node)}`;
                    codeString += `${indent}<img class='${classString}' src='https://via.placeholder.com/${imgW}x${imgH}' />\n`;
    
                    return;
                }
            }
        }

        // Check for the Vector Node:
        if(node.type == "VECTOR" || node.type == "ELLIPSE"){
            
            // The below terniay operation, checks if the node type is vector then take the path from vectorPaths property of the Node
            // Else if it is eclipse than take the path from fillGeometry property of the node (as ecllipse node does not have vectorPaths property)
            let path = node.type == "VECTOR" ? (node.vectorPaths.length > 0 ? node.vectorPaths[0].data : '') : (node.fillGeometry.length > 0 ? node.fillGeometry[0].data : '');

            let width = parseInt(node.width);
            let height = parseInt(node.height);
            let strokeColor = node.strokes.length > 0 ? RGBToHex(node.strokes[0].color) : 'none';
            let strokeJoin = node.strokeJoin;
            let strokeCap = node.strokeCap;
            let strokeWidth = node.strokeWeight;
            let SVGFill = node.fills.length > 0 ? RGBToHex(node.fills[0].color) : 'none';
            

            codeString += `<svg class="${getSpacingFromParent(node)} m-auto" width="${width}" height="${height}" viewBox="0 0 ${width+1} ${height+1}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${path}" fill="${SVGFill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeCap.toLowerCase()}" stroke-linejoin="${strokeJoin.toLowerCase()}"/>
            </svg>\n`;

            return;
        }
        
        const values = getValues(node);
        const flexString = getTailWindClasses(values);
        
        classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getWidth(node)} ${getRotateValue(node)} ${getHeight(node)} ${getBGColor(node)} ${flexString} ${getBorderWidthClass(node)} ${getSpacingFromParent(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getBoxShadow(node)}`;
        classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
        classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
        codeString +=`${indent}<${userTag} ${userTag == 'input' ? `placeholder='${placeholderValue}'` : ''} class='${placeholderStyles+' '+classString}'>\n`;  // the userTag check in this field means, if the tag is an input field then display the placeholder styles and placholder value, else keeps hidden them

        children.forEach(child => {
            createCode(child); // Recursion call for each child to create a tree of layers as Parent and Child
        });

        codeString += `${indent}</${userTag}>\n`;   // Add a Closing Tags at the end
    }else{

        // cheking if the node is an imageNode
        if("fills" in node){
            if(node.fills.length >= 1){
                if(node.fills[0].type == "IMAGE"){
                    let imgH = node.height;
                    let imgW = node.width;
    
                    classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBoxShadow(node)}`;
                    classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
                    classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
                    codeString += `${indent}<img class='${classString}' src='https://via.placeholder.com/${imgW}x${imgH}' />\n`;
    
                    return;
                }
            }
        }

        // Check for the Vector Node:
        if(node.type == "VECTOR" || node.type == "ELLIPSE"){

            // The below terniay operation, checks if the node type is vector then take the path from vectorPaths property of the Node
            // Else if it is eclipse than take the path from fillGeometry property of the node (as ecllipse node does not have vectorPaths property)
            let path = node.type == "VECTOR" ? (node.vectorPaths.length > 0 ? node.vectorPaths[0].data : '') : (node.fillGeometry.length > 0 ? node.fillGeometry[0].data : '');

            let width = parseInt(node.width);
            let height = parseInt(node.height);
            let strokeColor = node.strokes.length > 0 ? RGBToHex(node.strokes[0].color) : 'none';
            let strokeJoin = node.strokeJoin;
            let strokeCap = node.strokeCap;
            let strokeWidth = node.strokeWeight;
            let SVGFill = node.fills.length > 0 ? RGBToHex(node.fills[0].color) : 'none';
            

            codeString += `<svg class="${getSpacingFromParent(node)} m-auto" width="${width}" height="${height}" viewBox="0 0 ${width+1} ${height+1}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${path}" fill="${SVGFill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeCap.toLowerCase()}" stroke-linejoin="${strokeJoin.toLowerCase()}"/>
            </svg>\n`;

        }

        if(node.type == 'RECTANGLE'){
            classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBGColor(node)} ${getWidth(node)} ${getRotateValue(node)} ${getHeight(node)} ${getLayout(node)} ${getBorderWidthClass(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
            classString = classString.replace(/ +(?= )/g, ' ').trim();
            codeString += `${indent}<${userTag} ${userTag == 'input' ? `placeholder='${placeholderValue}'` : ''} class='${placeholderStyles+' '+classString}'></${userTag}>`;   // the userTag check in this field means, if the tag is an input field then display the placeholder styles and placholder value, else keeps hidden them
        }
        
        if(node.type == 'TEXT'){
            let parentTag = getDataFromPlugin(node.parent, 'CUSTOM_TAGS');  // Checking if the parent Tag is Input, So that I can add the text to the input field as placeholder rather then Text p tag
            if(parentTag == 'input'){
                return; // returning if the parent Tag is Input
            }
            let tag = getDataFromPlugin(node, 'CUSTOM_TAGS');
            let userParaTag = `${tag ? tag : 'p'}`; // If use set any kind of Test Tag, then use it otherwise use the standard div tag

            // Getting the styles if the field is the paragraph tag
            classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${textClasses(node)} ${getSpacingFromParent(node)} ${getWidth(node)} ${getBoxShadow(node)} ${getRotateValue(node)} `;
            classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
            classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces

            if(node.characters){
                codeString += `${indent}<${userParaTag} class='${classString}'>${node.characters.split('\n').join('&lt/br&gt')}</${userParaTag}>\n`;
            }else{
                codeString += `${indent}<${userParaTag} class='${classString}'></${userParaTag}>\n`;
            }
        }
    }

    return codeString.toString();
}

figma.showUI(__html__, { width: 648, height: 700, title: 'Figma to Tailwind' });
figma.ui.onmessage = msg => {
    
    if (msg.category === 'breakpoints') {
        let value = msg.classes;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page
        createBreakPointString(node.id, value);   // [this will transform the breakpoints object to breakpoints string and returns it]
        bpValue = changingBPStringToObj(node.id);  // This will check if there is any already present key to breakpoint mapping in it or not and convert the string to object and return it

        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        changedBreakpoints[node.id] ? node.setPluginData('BREAKPOINTS', JSON.stringify(bpValue)) : node.setPluginData('BREAKPOINTS', '');

        codeString = ''; // making the code string empty to generate the new code with the the breakpoint in it
        createCode(node); // Creating a New code String with the breakpoints added by the user
               
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    

    }
    else if (msg.category === 'customClasses') {
        let value = msg.customClasses;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        createCustomTailwindString(node.id, value) // [this is update the customClass object about the new entry format {nodeID --> customClasses}]
        customTailwindValue = iskeyInObject(addedCustomClasses, node.id);  // This function checks if there is any already exist mapping in the object

        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedCustomClasses[node.id] ? node.setPluginData('CUSTOM_CLASSES', JSON.stringify(addedCustomClasses[node.id])) : node.setPluginData('CUSTOM_CLASSES', '');


        codeString = ''; // making the code string empty to generate the new code with the the Custom Classes in it
        createCode(node);  // Creating a New code String with the custom Classes added by the user

        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
        
    }
    else if (msg.category === 'tagName') {
        let value = msg.tagName;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        setTagName(node.id, value)  // [this is to update the customTag object about the new entery format {nodeID --> customTag}]
        customTag = iskeyInObject(addedTagName, node.id)  // This function checks if there is any already exist mapping in the object.
        
        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedTagName[node.id] ? node.setPluginData('CUSTOM_TAGS', JSON.stringify(addedTagName[node.id])) : node.setPluginData('CUSTOM_TAGS', '');
        
        codeString = ''; // making the code string empty to generate the new code with the custom Classes in it.
        createCode(node) // Creating a New code String with the custom tagName added by the user

        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
    }
    else if (msg.category === 'customInteractions') {
        let value = msg.customInteractions;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        let cleanValue = removeGarbageInteractions(value); // Removing the Garbage Values (Means if the state is selected but there is not class added to it)

        createInteractionsString(node.id, cleanValue); // [This is to update the customInteractions Object about the new entry format {nodeID --> customInteractions}]
        customInteractionValue = iskeyInObject(addedCustomInteractions, node.id) // This function checks if there is any already exist mapping in the object
        
        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedCustomInteractions[node.id] ? node.setPluginData('CUSTOM_INTERACTIONS', JSON.stringify(addedCustomInteractions[node.id])) : node.setPluginData('CUSTOM_INTERACTIONS', '');
        codeString = ''; // making the code String empty to generate the new Code with the custom Classes in it.
        createCode(node) // Creating a new code String with the custom Interactions added by the User

        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
    }
    else if(msg.category === 'previewCode'){
        // Create a New figma Window, which shows the preview of the Code   
        // Open PreviewCode and Resize it to make the preivew good in the figma
        figma.ui.resize(
            Math.round(figma.viewport.bounds.width),
            Math.round(figma.viewport.bounds.height)
        );
    }
    else if(msg.category === "closePreview"){
        // Close the Preivew Window and Resize it smaller
        figma.ui.resize(648,700);
    }
    // Created to use the clear function, So that to clear the data from the plugin Data'
    // This is a stub function, It is not working YET
    if(msg.clearData == 'clearData'){
        const node = figma.currentPage.selection[0];
        removeDataFromTree(node);
    }
};

// if the selection on the current page changes then run this callback function
const traverseLayers = (node, nodeids) => {
    if(!node){return}
    nodeids.push(node);
    if ('children' in node) {
        // nodeids.push(node);
        for (const child of node.children) {
            traverseLayers(child, nodeids);
        }
    }
    return nodeids;
}

figma.on('run', ()=> {
    initailPluginSetups();
});

figma.on('selectionchange', () => {
    initailPluginSetups();        
});


const initailPluginSetups = () => {
    let nodeids = [];
    if(figma.currentPage.selection.length == 0){
        return;     // return if the user selected something, that is not a node/layer in the figma, such as the canvas or properties sidebar
    }
    const node = figma.currentPage.selection[0];  // node, which is currently selected

    // This is just for the CHECK. I am sure that I am not using this arra, anywhere in the Code.
    traverseIds = traverseLayers(node, nodeids); // traveser through all the layers and store their ids in the GLOBAL array i.e. traverseids  

    codeString = '';  // Global Vairables
    createCode(node); // Creating the code as tree of layers
    
    if(node.getPluginData('BREAKPOINTS')){   // Condition to check, if there is already any data stored in plugin for that node
        bpValue = node.getPluginData('BREAKPOINTS');  // if yes, then assign it to bpValue
    }else{
        if(changedBreakpoints[node.id]){
            bpValue = changingBPStringToObj(node.id)
        }else{
            bpValue = changingBPStringToObj(node.id);   // This function will check if any breakPoints value already given to certain key (node)
        }
    }

    if(node.getPluginData('CUSTOM_CLASSES')){   // Condition to check, if there is already any data stored in plugin for that node
        customTailwindValue = node.getPluginData('CUSTOM_CLASSES'); // if yes, then assign it to customTailwindValue
        customTailwindValue = customTailwindValue.replaceAll('"', '');
    }else{
        customTailwindValue = iskeyInObject(addedCustomClasses,node.id) // This function will check if there is any custom Classes value already given to the certain key, if YES, then return classes else return false
    }

    if(node.getPluginData('CUSTOM_TAGS')){  // Condition to check, if there is already any data stored in plugin for that node
        customTag = node.getPluginData('CUSTOM_TAGS');  // if yes, then assign it to customTag
        customTag = customTag.replaceAll('"', '');
    }else{
        customTag = iskeyInObject(addedTagName, node.id) // This function will check if there is any custom tag Name already given to the certain key, if YES, then return the tagName, else returns false
    }

    if(node.getPluginData('CUSTOM_INTERACTIONS')){  // Condition to check, if there is already any data stored in plugin for that node
        customInteractionValue = node.getPluginData('CUSTOM_INTERACTIONS'); // if yes, then assign it to customInteractionValue
        customInteractionValue = customInteractionValue.replaceAll('"', '');
    }else{
        customInteractionValue = iskeyInObject(addedCustomInteractions, node.id) // This function will check if there is any custom Styling already given to the certain key, if YES, then return the customStyles, else returns false
    }

    // Sending the values back to the ui.html to display
    figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
}