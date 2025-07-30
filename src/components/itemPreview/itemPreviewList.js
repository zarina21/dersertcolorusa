import React from 'react';
import ItemCard from './itemPreview';

const ItemList = ({ list }) => {
    return (
        <div className='columns'>
            {
                list?.map((element, index) => {
                    const item = element.data 
                    return (
                        <div key={element.id} className='column is-3'>
                            <ItemCard
                                id={element.id} // <-- Agrega esta línea
                                name={item.value}
                                description={item.description}
                                image={item.image}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ItemList