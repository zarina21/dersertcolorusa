import React from 'react';
import Link from 'next/link';
import ItemCard from './itemPreview';

const ItemList = ({ list }) => {
    return (
        <div className='columns'>
            {
                list?.map((element, index) => {
                    const item = element.data;
                    console.log('category:', item.category, 'id:', element.id);
                    const category = item.category || "businessCard";
                    return (
                        <div key={element.id} className='column is-3'>
                            <Link href={`/${category}/product/${element.id}`}>
                                <ItemCard
                                    id={element.id}
                                    name={item.value}
                                    description={item.description}
                                    image={item.image}
                                />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ItemList;

