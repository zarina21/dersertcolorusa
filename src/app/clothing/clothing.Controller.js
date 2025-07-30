import { useState } from "react";

const template = [
    {
        name: ' Roll Labels',
        key: 'roll-labels-key',
        value: 'option 1'
    },
    {
        name: 'Stickers',
        key: 'stickers-key',
        value: 'option 2'
    },
    {
        name: 'Vinyl',
        key: 'vinyl-key',
        value: 'option 3'
    }
    
  ]
  
const size = [
    {
        name: ' 2" x 3.5" (US Standard)',
        key: '2x3.5-key',
        value: '2x3.5'
    },
    {
        name: ' 2" x 2"',
        key: '2x2-key',
        value: '2x2'
    },
    {
        name: ' 3" x 3"',
        key: '3x3-key',
        value: '3x3'
    },
    {
        name: ' 4" x 4"',
        key: '4x4-key', 
        value: '4x4'
    },
    {
        name: ' 2.5" x 2.5"',
        key: '2.5x2.5-key',
        value: '2.5x2.5'
    },
    {
        name: ' 3" x 4"',
        key: '3x4-key',
        value: '3x4'
    },
    {
        name: ' 4" x 6"',
        key: '4x6-key',
    }
]

const stock = [
    {
        name: ' 70lb Sticker with split liner',
        key: '70lb-key',
        value: 'option 1'
  
    },
    {
        name: ' 4MIL Matte Vinyl Stickers',
        key: '4mil-key',
        value: 'option 2'
    },
]
export const useClothingController = () => {
    const [valueAside, setValueAside] = useState({
      template: [],
      size: [],
      stock: [],
    });
  
    const selectCheckbox = (item, asideName) => {
      const valueResult =  valueAside[asideName].find(p => p.value === item.value);
      if(valueResult){
        setValueAside({
          ...valueAside,
          [asideName]: valueAside[asideName].filter((e) => e.value !== item.value)
        });
        return 
      };
      setValueAside({
        ...valueAside,
        [asideName]: [...valueAside[asideName], item]
      });
    }

    return {
        valueAside,
        selectCheckbox,
        template,
        size,
        stock,
    }

}