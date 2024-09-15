import React, { useState, useEffect } from 'react';
import GiftList from './components/GiftList';
import AddItemForm from './components/AddItemForm';
import ShareList from './components/ShareList';
import './App.css';

export interface GiftItem {
  id: string;
  name: string;
  link?: string;
  price?: number;
  notes?: string;
}

const App: React.FC = () => {
  const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a shared list ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedListId = urlParams.get('list');
    if (sharedListId) {
      // In a real app, you'd fetch the shared list from a server here
      // For this example, we'll just decode the items from the URL
      try {
        const decodedItems = JSON.parse(atob(sharedListId));
        setGiftItems(decodedItems);
      } catch (error) {
        console.error('Failed to load shared list:', error);
      }
    }
  }, []);

  const addItem = (item: Omit<GiftItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setGiftItems([...giftItems, newItem]);
  };

  const removeItem = (id: string) => {
    setGiftItems(giftItems.filter(item => item.id !== id));
  };

  const updateItem = (updatedItem: GiftItem) => {
    setGiftItems(giftItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const shareList = () => {
    // Encode the current list as a base64 string
    const encodedList = btoa(JSON.stringify(giftItems));
    const url = `${window.location.origin}${window.location.pathname}?list=${encodedList}`;
    setShareableUrl(url);
  };

  return (
      <div className="App">
        <h1>Gift List App</h1>
        <AddItemForm onAddItem={addItem} />
        <GiftList items={giftItems} onRemoveItem={removeItem} onUpdateItem={updateItem} />
        <ShareList shareableUrl={shareableUrl} onShareList={shareList} />
      </div>
  );
};

export default App;