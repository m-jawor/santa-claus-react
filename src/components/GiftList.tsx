import React from 'react';
import { GiftItem } from '../App';

interface GiftListProps {
    items: GiftItem[];
    onRemoveItem: (id: string) => void;
    onUpdateItem: (item: GiftItem) => void;
}

const GiftList: React.FC<GiftListProps> = ({ items, onRemoveItem, onUpdateItem }) => {
    return (
        <div className="gift-list">
            <h2>Your Gift List</h2>
            {items.length === 0 ? (
                <p>Your list is empty. Add some gifts!</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <strong>{item.name}</strong>
                            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer"> (Link)</a>}
                            {item.price && <span> - ${item.price.toFixed(2)}</span>}
                            {item.notes && <p>{item.notes}</p>}
                            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                            <button onClick={() => {
                                const updatedName = prompt('Update gift name', item.name);
                                if (updatedName) {
                                    onUpdateItem({ ...item, name: updatedName });
                                }
                            }}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GiftList;