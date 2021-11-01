const colorMap = {
    //*THE SEQUENCE OF THE COLORS IS FROM THE TW DOCS
    //white
    '#FFFFFF':'white',
    //black
    '#000000':'black',

    //gray
    '#F9FAFB':'gray-50',
    '#F3F4F6':'gray-100',
    '#E5E7EB':'gray-200',
    '#D1D5DB':'gray-300',
    '#9CA3AF':'gray-400',
    '#6B7280':'gray-500',
    '#4B5563':'gray-600',
    '#374151':'gray-700',
    '#1F2937':'gray-800',
    '#111827':'gray-900',

    //red
    '#FEF2F2':'red-50',
    '#FEE2E2':'red-100',
    '#FECACA':'red-200',
    '#FCA5A5':'red-300',
    '#F87171':'red-400',
    '#EF4444':'red-500',
    '#DC2626':'red-600',
    '#B91C1C':'red-700',
    '#991B1B':'red-800',
    '#7F1D1D':'red-900',

    //yellow
    '#FFFBEB':'yellow-50',
    '#FEF3C7':'yellow-100',
    '#FDE68A':'yellow-200',
    '#FCD34D':'yellow-300',
    '#FBBF24':'yellow-400',
    '#F59E0B':'yellow-500',
    '#D97706':'yellow-600',
    '#B45309':'yellow-700',
    '#92400E':'yellow-800',
    '#78350F':'yellow-900',

    //green
    '#ECFDF5':'green-50',
    '#D1FAE5':'green-100',
    '#A7F3D0':'green-200',
    '#6EE7B7':'green-300',
    '#34D399':'green-400',
    '#10B981':'green-500',
    '#059669':'green-600',
    '#047857':'green-700',
    '#065F46':'green-800',
    '#064E3B':'green-900',

    
    //blue
    '#EFF6FF':'blue-50',
    '#DBEAFE':'blue-100',
    '#BFDBFE':'blue-200',
    '#93C5FD':'blue-300',
    '#60A5FA':'blue-400',
    '#3B82F6':'blue-500',
    '#2563EB':'blue-600',
    '#1D4ED8':'blue-700',
    '#1E40AF':'blue-800',
    '#1E3A8A':'blue-900',

    //indigo
    '#EEF2FF':'indigo-50',
    '#E0E7FF':'indigo-100',
    '#C7D2FE':'indigo-200',
    '#A5B4FC':'indigo-300',
    '#818CF8':'indigo-400',
    '#6366F1':'indigo-500',
    '#4F46E5':'indigo-600',
    '#4338CA':'indigo-700',
    '#3730A3':'indigo-800',
    '#312E81':'indigo-900',

    //purple
    '#F5F3FF':'purple-50',
    '#EDE9FE':'purple-100',
    '#DDD6FE':'purple-200',
    '#C4B5FD':'purple-300',
    '#A78BFA':'purple-400',
    '#8B5CF6':'purple-500',
    '#7C3AED':'purple-600',
    '#6D28D9':'purple-700',
    '#5B21B6':'purple-800',
    '#4C1D95':'purple-900',
    
    //pink
    '#FDF2F8':'pink-50',
    '#FCE7F3':'pink-100',
    '#FBCFE8':'pink-200',
    '#F9A8D4':'pink-300',
    '#F472B6':'pink-400',
    '#EC4899':'pink-500',
    '#DB2777':'pink-600',
    '#BE185D':'pink-700',
    '#9D174D':'pink-800',
    '#831843':'pink-900',
   }

   const pixelToTailwind = {
    '0':'0',
    '1':'px',
    '4':'1',
    '6':'1.5',
    '8':'2',
    '10':'2.5',
    '12':'3',
    '14':'3.5',
    '16':'4',
    '20':'5',
    '24':'6',
    '28':'7',
    '32':'8',
    '36':'9',
    '40':'10',
    '44':'11',
    '48':'12',
    '56':'14',
    '64':'16',
    '80':'20',
    '96':'24',
    '112':'28',
    '128':'32',
    '144':'36',
    '160':'40',
    '176':'44',
    '192':'48',
    '208':'52',
    '224':'56',
    '240':'60',
    '256':'64',
    '272':'68',
    '288':'72',
    '304':'76',
    '320':'80',
    '336':'84',
    '352':'88',
    '368':'92',
    '384':'96',

    //fractional
    '50%':'1/2',
    '33.33%':'1/3',
    '66.66%':'2/3',

    '25%':'1/4',
    '50%':'2/4',
    '75%':'3/4',

    '20%':'1/5',
    '40%':'2/5',
    '60%':'3/5',
    '80%':'4/5',

    '16.66%':'1/6',
    '33.33%':'2/6',
    '50%':'3/6',
    '66.66%':'4/6',
    '83.33%':'5/6',

    '8.33%':'1/12',
    '16.66%':'2/12',
    '25%':'3/12',
    '33.33%':'4/12',
    '41.66%':'5/12',
    '50%':'6/12',
    '58.33%':'7/12',
    '66.66%':'8/12',
    '75%':'9/12',
    '83.33%':'10/12',
    '91.66%':'11/12',
    '95%:':'full',
    
    'screen': 'screen'
}

const fractionalPixelHaystack = [
    '8.33', 
    '16.66', 
    '25', 
    '33.33', 
    '41.66', 
    '50', 
    '58.33', 
    '66.66', 
    '75', 
    '83.33', 
    '91.66',
    '95'
];

const fontPixelToTailwind = {
    '12':'text-xs',
    '14':'text-sm',
    '16':'text-base',
    '18':'text-lg',
    '20':'text-xl',
    '24':'text-2xl',
    '30':'text-3xl',
    '36':'text-4xl',
    '48':'text-5xl',
    '60':'text-6xl',
    '72':'text-7xl',
    '96':'text-8xl',
    '128':'text-9xl',
}

const fontWeightMap = {
    //there are 9 font weights in figma with numbers
    //associated from 100 to 900
    'Thin':'font-thin',
    'Extra Light':'font-extralight',
    'Light':'font-light',
    'Regular': 'font-regular',
    'Medium': 'font-medium',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'Extra Bold': 'font-extrabold',
    'Black': 'font-black',
}

const borderRadiusMap = {
    //keyword == rounded that needs to be replaced with rounded-t- etc 
    '0':'-none', //0.375 rem
    '2':'-sm', //0.375 rem
    '4':'', //0.375 rem
    '6':'-md', //0.375 rem
    '8':'-lg', //0.375 rem
    '12':'-xl', //0.375 rem
    '16':'-2xl', //0.375 rem
    '24':'-3xl', //0.375 rem
    '9999':'-full', //0.375 rem
}

const borderWidthMap = {
    //values on the left side are the pixel values from API
    //values on the right side  are the pixel values of tailwind classes
    //format -> rounded-2, rounded etc
    '0': '-0',
    '2': '-2',
    '4': '-4',
    '8': '-8',
    '1': '',
}



//TEXT MAPS

module.exports = {
    colorMap,
    pixelToTailwind,
    fontWeightMap,
    fontPixelToTailwind,
    borderRadiusMap,
    borderWidthMap,
    fractionalPixelHaystack,
}