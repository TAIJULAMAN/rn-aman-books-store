import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Book } from '../../models/Book';
import MockDataService from '../../services/MockDataService';
import BookCard from '../../components/books/BookCard';
import CategoryChip from '../../components/books/CategoryChip';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

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
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Aman Books</Text>
                <Text style={styles.headerSubtitle}>Discover Your Next Read</Text>
            </View>

            {/* Search Bar */}
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
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.categoriesContainer}
                            >
                                {categories.map((category) => (
                                    <CategoryChip
                                        key={category}
                                        category={category}
                                        isSelected={selectedCategory === category}
                                        onPress={() => setSelectedCategory(category)}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Popular Books */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                {selectedCategory === 'All' ? 'Popular Books' : selectedCategory}
                            </Text>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No books found</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xxl + 20,
        paddingBottom: Spacing.lg,
    },
    headerTitle: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.xs,
    },
    headerSubtitle: {
        fontSize: FontSize.sm,
        color: Colors.primaryLight,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.lg,
        marginTop: -Spacing.lg,
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        fontSize: 18,
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
    },
    section: {
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    categoriesContainer: {
        marginBottom: Spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl,
    },
    emptyText: {
        fontSize: FontSize.md,
        color: Colors.textMuted,
    },
});

export default HomeScreen;
