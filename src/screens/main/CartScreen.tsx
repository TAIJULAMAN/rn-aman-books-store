import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

interface CartScreenProps {
    navigation: NavigationProp<any>;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>🛒</Text>
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptySubtitle}>Add some books to get started!</Text>
                <Button
                    title="Browse Books"
                    onPress={() => navigation.navigate('Home')}
                    style={styles.browseButton}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                <Text style={styles.headerSubtitle}>{totalItems} items</Text>
            </View>

            {/* Cart Items */}
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />

            {/* Footer with Total and Checkout */}
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
                <Button title="Proceed to Checkout" onPress={handleCheckout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundGray,
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
    listContent: {
        padding: Spacing.lg,
    },
    footer: {
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    totalLabel: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.text,
    },
    totalPrice: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.primary,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.xl,
    },
    emptyEmoji: {
        fontSize: 80,
        marginBottom: Spacing.lg,
    },
    emptyTitle: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    emptySubtitle: {
        fontSize: FontSize.md,
        color: Colors.textLight,
        marginBottom: Spacing.xl,
    },
    browseButton: {
        minWidth: 200,
    },
});

export default CartScreen;
