import { Book } from '../models/Book';
import { User, AuthResponse } from '../models/User';

// Simulated delay for realistic loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock book data - 10 books across different categories
const MOCK_BOOKS: Book[] = [
    {
        id: '1',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        price: 14.99,
        category: 'Fiction',
        rating: 4.5,
        synopsis: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        isbn: '9780525559474',
        publishedYear: 2020,
    },
    {
        id: '2',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 42.99,
        category: 'Tech',
        rating: 4.8,
        synopsis: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. This book will teach you how to write good code.',
        imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
        isbn: '9780132350884',
        publishedYear: 2008,
    },
    {
        id: '3',
        title: 'Dune',
        author: 'Frank Herbert',
        price: 18.99,
        category: 'Sci-Fi',
        rating: 4.7,
        synopsis: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
        imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        isbn: '9780441172719',
        publishedYear: 1965,
    },
    {
        id: '4',
        title: 'The Design of Everyday Things',
        author: 'Don Norman',
        price: 24.99,
        category: 'Tech',
        rating: 4.6,
        synopsis: 'Design doesn\'t really matter, right? Wrong. In this fascinating book, cognitive scientist Don Norman shows how good design is actually crucial.',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        isbn: '9780465050659',
        publishedYear: 2013,
    },
    {
        id: '5',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 12.99,
        category: 'Romance',
        rating: 4.9,
        synopsis: 'A timeless tale of love and society in Georgian England. Elizabeth Bennet must navigate the world of marriage and manners.',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        isbn: '9780141439518',
        publishedYear: 1813,
    },
    {
        id: '6',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: 16.99,
        category: 'Mystery',
        rating: 4.4,
        synopsis: 'Alicia Berenson\'s life is seemingly perfect. One evening she shoots her husband and then never speaks another word. A criminal psychotherapist is determined to unravel the mystery.',
        imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        isbn: '9781250301697',
        publishedYear: 2019,
    },
    {
        id: '7',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        price: 19.99,
        category: 'Sci-Fi',
        rating: 4.8,
        synopsis: 'Ryland Grace wakes up on a spaceship with no memory of why he\'s there. His crewmates are dead. He\'s on a desperate mission to save humanity.',
        imageUrl: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=400',
        isbn: '9780593135204',
        publishedYear: 2021,
    },
    {
        id: '8',
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        price: 15.99,
        category: 'Fiction',
        rating: 4.7,
        synopsis: 'Aging Hollywood icon Evelyn Hugo finally tells the story of her glamorous and scandalous life. But why has she chosen unknown magazine reporter Monique Grant?',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        isbn: '9781501161933',
        publishedYear: 2017,
    },
    {
        id: '9',
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        price: 17.99,
        category: 'Mystery',
        rating: 4.3,
        synopsis: 'On their fifth wedding anniversary, Nick\'s wife Amy disappears. Under mounting pressure, Nick\'s lies and strange behavior make him the prime suspect.',
        imageUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400',
        isbn: '9780307588371',
        publishedYear: 2012,
    },
    {
        id: '10',
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 21.99,
        category: 'Tech',
        rating: 4.9,
        synopsis: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how tiny changes can lead to remarkable results.',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        isbn: '9780735211292',
        publishedYear: 2018,
    },
];

class MockDataService {
    // Authentication Methods
    static async login(email: string, password: string): Promise<AuthResponse> {
        await delay(1000); // Simulate network delay

        // Simple mock validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Mock successful login
        const user: User = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: 'https://i.pravatar.cc/150?img=12',
            createdAt: new Date(),
        };

        return {
            user,
            token: 'mock_token_' + Date.now(),
        };
    }

    static async signup(name: string, email: string, password: string): Promise<AuthResponse> {
        await delay(1000);

        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        const user: User = {
            id: Date.now().toString(),
            name,
            email,
            avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
            createdAt: new Date(),
        };

        return {
            user,
            token: 'mock_token_' + Date.now(),
        };
    }

    static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
        await delay(1000);

        if (!email) {
            throw new Error('Email is required');
        }

        return {
            success: true,
            message: 'Password reset link sent to your email',
        };
    }

    static async verifyOTP(otp: string): Promise<{ success: boolean }> {
        await delay(1000);

        // Mock OTP verification (accept any 4-digit code)
        if (otp.length === 4) {
            return { success: true };
        }

        throw new Error('Invalid OTP');
    }

    static async resetPassword(newPassword: string): Promise<{ success: boolean }> {
        await delay(1000);

        if (!newPassword || newPassword.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        return { success: true };
    }

    // Book Methods
    static async getBooks(): Promise<Book[]> {
        await delay(1000);
        return [...MOCK_BOOKS];
    }

    static async getBookById(id: string): Promise<Book | null> {
        await delay(500);
        return MOCK_BOOKS.find(book => book.id === id) || null;
    }

    static async getBooksByCategory(category: string): Promise<Book[]> {
        await delay(800);

        if (category === 'All') {
            return [...MOCK_BOOKS];
        }

        return MOCK_BOOKS.filter(book => book.category === category);
    }

    static async searchBooks(query: string): Promise<Book[]> {
        await delay(600);

        const lowerQuery = query.toLowerCase();
        return MOCK_BOOKS.filter(
            book =>
                book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery)
        );
    }

    static getCategories(): string[] {
        return ['All', 'Fiction', 'Tech', 'Sci-Fi', 'Romance', 'Mystery'];
    }
}

export default MockDataService;
