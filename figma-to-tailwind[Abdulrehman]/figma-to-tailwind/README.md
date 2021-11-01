# figma-to-tailwind

## How to run:


1. Clone the repository in a folder.
2. From figma, right click and go to Plugins > Development > "import plugin from manifest..." and select the manifest.json of the cloned repo from the browse menu.
3. Run the plugin from figma.

## Steps to get better code from plugin

1. Four node types work for now:
	-frame
	-group
	-rectangle
	-text
2. Only use values that are mapped to tailwind CSS.
3. Autolayouts are translated to flex in the code. However, in case of no 		autolayouts, 
   the paddings and margins do not work properly yet.

## Naming Convention for figma components

The plugin follows the following naming convention:

#### layername-bg-( breakpoint classes )[ any other classes added from the plugin ]{ html tag for the layer }

"bg" refers to a rectangle node that is used as a background in design.
"img" will be placed for images, that are replaced with images from placeholder API.
"bg" and "img" have to be written in the layer-name manually.

*The text in the brackets is persistent, even if the plugin is closed. It is properly read from the design by plugin.*
*The plugin automatically creates the brackets.*
