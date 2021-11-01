//function to convert rgb to hex
//figma gives values in RGB wheres tailwind works in hex
export const RGBToHex = (rgb) => {
    if(rgb){
        let r=rgb.r;
        let g=rgb.g;
        let b=rgb.b;

        //figma gives rgb values in [0,1] we convert it to [1,255]
        r=Math.round(rgb.r*255);
        g=Math.round(rgb.g*255);
        b=Math.round(rgb.b*255);

        //rgb values to hexadecimal values
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        // console.log("#" + r + g + b)
        return `#${r.toUpperCase() + g.toUpperCase() + b.toUpperCase()}`;
    }
}