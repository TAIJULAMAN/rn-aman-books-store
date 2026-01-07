import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCart } from '../../context/CartContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

type RootStackParamList = {
    Payment: { total: number };
};

type Props = {
    navigation: any;
    route: StackScreenProps<RootStackParamList, 'Payment'>['route'];
};

const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
    const { total } = route.params;
    const { clearCart } = useCart();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.substring(0, 19); // 16 digits + 3 spaces
    };

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\//g, '');
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
        }
        return cleaned;
    };

    const handlePayment = async () => {
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            Alert.alert('Error', 'Please fill in all card details');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            Alert.alert('Error', 'Please enter a valid card number');
            return;
        }

        if (cvv.length !== 3) {
            Alert.alert('Error', 'Please enter a valid CVV');
            return;
        }

        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            clearCart();
            navigation.navigate('OrderSuccess' as never);
        }, 2000);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Card Information</Text>

                <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    keyboardType="numeric"
                />

                <Input
                    placeholder="John Doe"
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="words"
                />

                <View style={styles.row}>
                    <Input
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                        keyboardType="numeric"
                        containerStyle={styles.halfInput}
                    />

                    <Input
                        placeholder="123"
                        value={cvv}
                        onChangeText={(text) => setCvv(text.substring(0, 3))}
                        keyboardType="numeric"
                        isPassword
                        containerStyle={styles.halfInput}
                    />
                </View>

                <View style={styles.securityNote}>
                    <Text style={styles.securityIcon}>🔒</Text>
                    <Text style={styles.securityText}>
                        Your payment information is secure and encrypted
                    </Text>
                </View>

                <Button
                    title={loading ? 'Processing...' : 'Pay Now'}
                    onPress={handlePayment}
                    loading={loading}
                />
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
    totalContainer: {
        backgroundColor: Colors.primary,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    totalLabel: {
        fontSize: FontSize.sm,
        color: Colors.primaryLight,
        marginBottom: Spacing.xs,
    },
    totalAmount: {
        fontSize: FontSize.xxxl,
        fontWeight: '700',
        color: Colors.white,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    halfInput: {
        flex: 1,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.lg,
    },
    securityIcon: {
        fontSize: 20,
        marginRight: Spacing.sm,
    },
    securityText: {
        flex: 1,
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
});

export default PaymentScreen;
