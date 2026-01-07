export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    category: string;
    rating: number;
    synopsis: string;
    imageUrl: string;
    isbn?: string;
    publishedYear?: number;
}

export type BookCategory = 'Fiction' | 'Tech' | 'Sci-Fi' | 'Romance' | 'Mystery' | 'All';
