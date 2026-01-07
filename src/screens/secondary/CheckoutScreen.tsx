import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface CheckoutScreenProps {
    navigation: NavigationProp<any>;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
    const { totalPrice } = useCart();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [shippingMethod, setShippingMethod] = useState('standard');

    const shippingOptions = [
        { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 days' },
        { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 days' },
        { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1 day' },
    ];

    const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
    const finalTotal = totalPrice + (selectedShipping?.price || 0);

    const handleProceedToPayment = () => {
        if (!address || !city || !zipCode) {
            Alert.alert('Error', 'Please fill in all address fields');
            return;
        }

        navigation.navigate('Payment', { total: finalTotal });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>

                <Input
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                />

                <Input
                    placeholder="Enter your city"
                    value={city}
                    onChangeText={setCity}
                />

                <Input
                    placeholder="Enter ZIP code"
                    value={zipCode}
                    onChangeText={setZipCode}
                    keyboardType="numeric"
                />

                <Text style={styles.sectionTitle}>Shipping Method</Text>

                {shippingOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.shippingOption,
                            shippingMethod === option.id && styles.shippingOptionSelected,
                        ]}
                        onPress={() => setShippingMethod(option.id)}
                    >
                        <View style={styles.radio}>
                            {shippingMethod === option.id && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.shippingInfo}>
                            <Text style={styles.shippingName}>{option.name}</Text>
                            <Text style={styles.shippingDays}>{option.days}</Text>
                        </View>
                        <Text style={styles.shippingPrice}>${option.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}

                <View style={styles.summaryContainer}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping:</Text>
                        <Text style={styles.summaryValue}>${selectedShipping?.price.toFixed(2)}</Text>
                    </View>

                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
                    </View>
                </View>

                <Button title="Proceed to Payment" onPress={handleProceedToPayment} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
        marginTop: Spacing.md,
    },
    shippingOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 2,
        borderColor: Colors.border,
        marginBottom: Spacing.sm,
    },
    shippingOptionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryLight + '10',
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: BorderRadius.full,
        borderWidth: 2,
        borderColor: Colors.primary,
        marginRight: Spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
    },
    shippingInfo: {
        flex: 1,
    },
    shippingName: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: Colors.text,
    },
    shippingDays: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
    shippingPrice: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.primary,
    },
    summaryContainer: {
        backgroundColor: Colors.backgroundGray,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    summaryLabel: {
        fontSize: FontSize.md,
        color: Colors.textLight,
    },
    summaryValue: {
        fontSize: FontSize.md,
        color: Colors.text,
        fontWeight: '600',
    },
    totalRow: {
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    totalLabel: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
    },
    totalValue: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default CheckoutScreen;
