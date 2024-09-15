import React, { useState } from 'react';
import { GiftItem } from '../App';

interface AddItemFormProps {
    onAddItem: (item: Omit<GiftItem, 'id'>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddItem({
            name: name.trim(),
            link: link.trim() || undefined,
            price: price ? parseFloat(price) : undefined,
            notes: notes.trim() || undefined,
        });
        setName('');
        setLink('');
        setPrice('');
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Gift name"
                required
            />
            <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link (optional)"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (optional)"
                step="0.01"
                min="0"
            />
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (optional)"
            />
            <button type="submit">Add Gift</button>
        </form>
    );
};

export default AddItemForm;