import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Book } from '../../models/Book';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface BookCardProps {
    book: Book;
    onPress: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri: book.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {book.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                    {book.author}
                </Text>
                <View style={styles.footer}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.rating}>{book.rating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.price}>${book.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: Spacing.md,
    },
    title: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    author: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
        marginBottom: Spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 14,
        marginRight: 4,
    },
    rating: {
        fontSize: FontSize.sm,
        color: Colors.text,
        fontWeight: '600',
    },
    price: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default BookCard;
