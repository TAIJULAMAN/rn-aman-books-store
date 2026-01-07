import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '../models/CartItem';
import { Book } from '../models/Book';

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (book: Book) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === book.id);

            if (existingItem) {
                // Increase quantity if already in cart
                return prevItems.map(item =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item to cart
                const newItem: CartItem = {
                    ...book,
                    quantity: 1,
                    addedAt: new Date(),
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (bookId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== bookId));
    };

    const updateQuantity = (bookId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === bookId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const isInCart = (bookId: string): boolean => {
        return items.some(item => item.id === bookId);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const value: CartContextType = {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
