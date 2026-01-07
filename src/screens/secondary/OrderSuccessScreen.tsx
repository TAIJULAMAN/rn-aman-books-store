import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

interface OrderSuccessScreenProps {
    navigation: NavigationProp<any>;
}

const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({ navigation }) => {
    const [scaleAnim] = useState(new Animated.Value(0));
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Animate checkmark
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleContinueShopping = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.checkmarkContainer,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.checkmarkCircle}>
                    <Text style={styles.checkmark}>✓</Text>
                </View>
            </Animated.View>

            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <Text style={styles.title}>Order Successful!</Text>
                <Text style={styles.subtitle}>
                    Thank you for your purchase. Your order has been placed successfully.
                </Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Order Number:</Text>
                        <Text style={styles.infoValue}>#AMB{Date.now().toString().slice(-6)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Estimated Delivery:</Text>
                        <Text style={styles.infoValue}>5-7 business days</Text>
                    </View>
                </View>

                <Text style={styles.emailNote}>
                    📧 A confirmation email has been sent to your email address
                </Text>

                <Button
                    title="Continue Shopping"
                    onPress={handleContinueShopping}
                    style={styles.button}
                />

                <Button
                    title="View Order History"
                    onPress={() => navigation.navigate('Profile')}
                    variant="outline"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
    },
    checkmarkContainer: {
        marginBottom: Spacing.xl,
    },
    checkmarkCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 60,
        color: Colors.white,
        fontWeight: '700',
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 24,
    },
    infoContainer: {
        backgroundColor: Colors.backgroundGray,
        padding: Spacing.lg,
        borderRadius: 12,
        width: '100%',
        marginBottom: Spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    infoLabel: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
    infoValue: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.text,
    },
    emailNote: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    button: {
        width: '100%',
        marginBottom: Spacing.md,
    },
});

export default OrderSuccessScreen;
