import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Book } from '../../models/Book';
import MockDataService from '../../services/MockDataService';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

type RootStackParamList = {
    BookDetails: { bookId: string };
};

type Props = {
    navigation: any;
    route: StackScreenProps<RootStackParamList, 'BookDetails'>['route'];
};

const BookDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const { bookId } = route.params;
    const { addToCart, isInCart } = useCart();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [bookId]);

    const loadBook = async () => {
        try {
            setLoading(true);
            const data = await MockDataService.getBookById(bookId);
            setBook(data);
        } catch (error) {
            console.error('Error loading book:', error);
            Alert.alert('Error', 'Failed to load book details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (book) {
            addToCart(book);
            Alert.alert('Success', `${book.title} added to cart!`, [
                { text: 'Continue Shopping', style: 'cancel' },
                { text: 'View Cart', onPress: () => navigation.navigate('Cart' as never) },
            ]);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!book) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Book not found</Text>
            </View>
        );
    }

    const inCart = isInCart(book.id);

    return (
        <ScrollView style={styles.container}>
            {/* Book Cover */}
            <Image source={{ uri: book.imageUrl }} style={styles.coverImage} />

            {/* Book Info */}
            <View style={styles.content}>
                {/* Category Badge */}
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{book.category}</Text>
                </View>

                {/* Title and Author */}
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>by {book.author}</Text>

                {/* Rating and Price */}
                <View style={styles.infoRow}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.rating}>{book.rating.toFixed(1)}</Text>
                        <Text style={styles.ratingCount}>(245 reviews)</Text>
                    </View>
                    <Text style={styles.price}>${book.price.toFixed(2)}</Text>
                </View>

                {/* Additional Info */}
                {book.isbn && (
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>ISBN:</Text>
                        <Text style={styles.detailValue}>{book.isbn}</Text>
                    </View>
                )}
                {book.publishedYear && (
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Published:</Text>
                        <Text style={styles.detailValue}>{book.publishedYear}</Text>
                    </View>
                )}

                {/* Synopsis */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Synopsis</Text>
                    <Text style={styles.synopsis}>{book.synopsis}</Text>
                </View>

                {/* Add to Cart Button */}
                <View style={styles.buttonContainer}>
                    {inCart ? (
                        <Button
                            title="View Cart"
                            onPress={() => navigation.navigate('Cart' as never)}
                            variant="secondary"
                        />
                    ) : (
                        <Button title="Add to Cart" onPress={handleAddToCart} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    coverImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    content: {
        padding: Spacing.lg,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.md,
    },
    categoryText: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        color: Colors.primary,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    author: {
        fontSize: FontSize.lg,
        color: Colors.textLight,
        marginBottom: Spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 18,
        marginRight: 4,
    },
    rating: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginRight: Spacing.xs,
    },
    ratingCount: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
    },
    price: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.primary,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: Spacing.sm,
    },
    detailLabel: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.textLight,
        width: 80,
    },
    detailValue: {
        fontSize: FontSize.sm,
        color: Colors.text,
        flex: 1,
    },
    section: {
        marginTop: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    synopsis: {
        fontSize: FontSize.md,
        color: Colors.textLight,
        lineHeight: 24,
    },
    buttonContainer: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    errorText: {
        fontSize: FontSize.lg,
        color: Colors.textMuted,
    },
});

export default BookDetailsScreen;
