import { Book } from './Book';

export interface CartItem extends Book {
    quantity: number;
    addedAt: Date;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}
