var smartgrid = require('smart-grid');
 
/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '0px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1202px', /* max-width оn very large screen */
        fields: '0' /* side fields */
    },
    breakPoints: {
        xl: {
            width: '1439px', /* -> @media (max-width: 1440px) */
            fields: '20px'
        },
        lg: {
            width: '1199px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '991px'
        },
        sm: {
            width: '767px',
            fields: '16px', /* set fields only if you want to change container.fields */
            offset: '10px'
        },
        xs: {
            width: '575px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};
 
smartgrid('./src/sass/utilities', settings);