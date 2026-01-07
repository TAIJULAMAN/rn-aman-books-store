import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { Book } from '../../models/Book';
import MockDataService from '../../services/MockDataService';
import BookCard from '../../components/books/BookCard';
import CategoryChip from '../../components/books/CategoryChip';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Colors, { Gradients } from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface HomeScreenProps {
    navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadBooks();
        setCategories(MockDataService.getCategories());
    }, []);

    useEffect(() => {
        filterBooks();
    }, [selectedCategory, searchQuery, books]);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await MockDataService.getBooks();
            setBooks(data);
            setFilteredBooks(data);
        } catch (error) {
            console.error('Error loading books:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadBooks();
        setRefreshing(false);
    };

    const filterBooks = () => {
        let result = books;

        // Filter by category
        if (selectedCategory !== 'All') {
            result = result.filter(book => book.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                book =>
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(result);
    };

    const handleBookPress = (book: Book) => {
        navigation.navigate('BookDetails', { bookId: book.id });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            {/* Simplified Header with Search */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search books or authors..."
                        placeholderTextColor={Colors.textMuted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookCard book={item} onPress={() => handleBookPress(item)} />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                    />
                }
                ListHeaderComponent={
                    <>
                        {/* Categories */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Browse by Genre</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.categoriesContainer}
                            >
                                {categories.map((category) => (
                                    <CategoryChip
                                        key={category}
                                        category={category as any}
                                        selected={selectedCategory === category}
                                        onPress={() => setSelectedCategory(category)}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Popular Books */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {selectedCategory === 'All' ? 'Featured Books' : selectedCategory}
                                </Text>
                                <Text style={styles.bookCount}>
                                    {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                                </Text>
                            </View>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>📚</Text>
                        <Text style={styles.emptyText}>No books found</Text>
                        <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundGray,
    },
    header: {
        backgroundColor: Colors.white,
        paddingTop: Spacing.xxl + 10,
        paddingBottom: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    greeting: {
        fontSize: FontSize.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: FontSize.xxl + 4,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.xs,
    },
    headerSubtitle: {
        fontSize: FontSize.md,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    leafEmoji: {
        fontSize: 48,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchIcon: {
        fontSize: 20,
        marginRight: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: Spacing.md,
        fontSize: FontSize.md,
        color: Colors.text,
    },
    listContent: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    bookCount: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
        marginBottom: Spacing.md,
    },
    categoriesContainer: {
        marginBottom: Spacing.sm,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl * 2,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: Spacing.md,
    },
    emptyText: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    emptySubtext: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
    },
});

export default HomeScreen;
