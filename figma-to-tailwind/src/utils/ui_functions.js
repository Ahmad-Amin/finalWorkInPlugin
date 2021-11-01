export let changedBreakpoints = {};  // This object contains the mapping of nodeKey and breakpoints String format --> {2:11 : sm:bg-red-blue lg:font-bold}...
export let addedCustomClasses = {}; // This object contains the mapping of nodeKey and custom Classes String format --> {nodeID : customClasses}
export let addedTagName = {}; // This object contains the mapping of nodeKey and custom TagName String format --> {nodeID : customTagName}
export let addedCustomInteractions = {};  // This object contains the mapping of nodeKey and custom Interactions String format --> {nodeID : Interactions}
export let addedCustomStyling = {};  // This object contains the mapping of nodeKey and custom Styling String format --> {nodeID : CustomStyling}

// Global Variables;


// Function to remove specific Data from the Plugin Node
export const removeDataFromTree = (node) => {
    return;
}

// Function to all stored data in the node and return the string of already present String
export const getDataFromPlugin = (node, key) => {
    
    let value = node.getPluginData(key);
    if(value){
        return value.replaceAll('"', '');
    }
    return '';
    
}
export const getbreakPointsData = (node) => {
    let b = node.getPluginData('BREAKPOINTS');
    let bObj = b.length > 0 ? JSON.parse(b) : b;
    let returnString;
    Object.keys(bObj).map(val => {       //Mapping through all the keys from input breakpoints entered by the User
        if(bObj[val].length > 0){        // Checking if there is a value for a key (i.e. to ignore the key, whose value is empty)
            returnString  = returnString + val.toString()+":" + bObj[val].toString() + " ";  //Constructing the String format -->{sm:bg-red-blue lg:font-bold}..
        }
    });
    return returnString;
}


// Two functions for seting breakPoints 
// 1. Creating the breakpoints String
// 2. Checking for the node if its value is already set or not
export const createBreakPointString = (key, breakpoints) => {
    if(breakpoints === null){return '';}
    let breakPointString = '';
    Object.keys(breakpoints).map(val => {       //Mapping through all the keys from input breakpoints entered by the User
        if(breakpoints[val].length > 0){        // Checking if there is a value for a key (i.e. to ignore the key, whose value is empty)
            breakPointString  = breakPointString + val.toString()+":" + breakpoints[val].toString() + " ";  //Constructing the String format -->{sm:bg-red-blue lg:font-bold}..
        }
    });
    changedBreakpoints[key] = breakPointString;
    // return changedBreakpoints;
}

export const changingBPStringToObj = (keyVal) => {
    let breakPointsArray = [];
    let arrayToObjects = {
        'sm': '',
        'md': '',
        'lg': '',
        'xl': '',
        '2xl': '',
    };
    if(keyVal in changedBreakpoints){
        breakPointsArray = changedBreakpoints[keyVal].split(" ");
    }

    breakPointsArray.map(v => {
        let bpIdentifier, bpValue;
        if(v.length != 0){
            bpIdentifier = v.slice(0, v.indexOf(':'));
            bpValue = v.slice(v.indexOf(':')+1, v.length1);
            arrayToObjects[bpIdentifier] = bpValue;
        }
    });

    return arrayToObjects;
}

// function for Setting custom Classes and storing in the classes Object
export const createCustomTailwindString = (key, customTailwind) => {
    addedCustomClasses[key] = customTailwind;
}

// Function for custom TagName and storing in the tagName Object;
export const setTagName = (key, tagName) => {
    addedTagName[key] = tagName;
}

// Function for custom Interactions and storing in the customInteractions Object
export const createInteractionsString = (key, customInteractions) => {
    addedCustomInteractions[key] = customInteractions;
}

// Function for custom Styling (except Tailwind) and storing in the customStyling Object
export const createCustomStylingString = (key, customStyle) => {
    addedCustomStyling[key] = customStyle
} 

// Function to check, if the a particular key is present in the object or not
export const iskeyInObject = (obj, key) => {
    if(key in obj){
        return obj[key];
    }
    return false
}