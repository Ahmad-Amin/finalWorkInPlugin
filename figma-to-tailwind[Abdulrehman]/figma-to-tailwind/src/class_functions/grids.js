// We have the following stuff from the API:

//     1. number of cols / rows.
//     2. gutter size - space b/w rows / cols
//     3. alignment - MIN MAX CENTER STRETCH (for left right center etc)
//     3. section size - size of each part (automatic for stretch)


// What we meed to do with this stuff???

// Firstly we need to create the grids mathematically (size and space b/w)
// We can apply the tailwind classes for 1- 12 columns (grid-cols-[1-12])
// Then we have to figure out the starting and ending point of the child components
// we can use grid-col-start and grid-col-end properties to align the DataTransferItemList.
