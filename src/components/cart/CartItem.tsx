import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '../../models/CartItem';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                        <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: BorderRadius.md,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        marginLeft: Spacing.md,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: Colors.text,
    },
    author: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
    price: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.primary,
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        borderRadius: BorderRadius.md,
        padding: 4,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: BorderRadius.sm,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.primary,
    },
    quantity: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: Colors.text,
        marginHorizontal: Spacing.sm,
        minWidth: 24,
        textAlign: 'center',
    },
    removeButton: {
        marginTop: Spacing.sm,
    },
    removeText: {
        fontSize: FontSize.sm,
        color: Colors.error,
        fontWeight: '600',
    },
});

export default CartItem;
