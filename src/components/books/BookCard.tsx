import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Book } from '../../models/Book';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface BookCardProps {
    book: Book;
    onPress: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: book.imageUrl }} style={styles.image} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.imageGradient}
                    />
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{book.category}</Text>
                    </View>
                </View>

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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.md,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    categoryBadge: {
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.sm,
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    categoryText: {
        color: Colors.white,
        fontSize: FontSize.xs,
        fontWeight: '700',
        textTransform: 'uppercase',
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
        fontSize: 16,
        marginRight: 4,
    },
    rating: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.text,
    },
    price: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default BookCard;
