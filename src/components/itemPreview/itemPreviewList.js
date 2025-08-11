import React from 'react';
import Link from 'next/link';
import ItemCard from './itemPreview';
import { usePathname } from 'next/navigation';

const ItemList = ({ list }) => {
    const pathname = usePathname();
    // Elimina cualquier /product o /product/loquesea al final para evitar duplicados
    const basePath = pathname.replace(/\/product(\/[^/]*)?$/, '');

    return (
        <div className='columns'>
            {
                list?.map((element, index) => (
                    <div key={element.id} className='column is-3'>
                        <Link href={`${basePath}/product/${element.id}`}>
                            <ItemCard
                                id={element.id}
                                name={element.data.value}
                                description={element.data.description}
                                image={element.data.image}
                            />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ItemList;

