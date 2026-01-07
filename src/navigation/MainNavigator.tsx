import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/main/HomeScreen';
import CartScreen from '../screens/main/CartScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import BookDetailsScreen from '../screens/secondary/BookDetailsScreen';
import CheckoutScreen from '../screens/secondary/CheckoutScreen';
import PaymentScreen from '../screens/secondary/PaymentScreen';
import OrderSuccessScreen from '../screens/secondary/OrderSuccessScreen';
import ChangePasswordScreen from '../screens/secondary/ChangePasswordScreen';
import Colors from '../constants/Colors';
import { useCart } from '../context/CartContext';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookDetails"
                component={BookDetailsScreen as any}
                options={{ title: 'Book Details' }}
            />
        </Stack.Navigator>
    );
};

// Cart Stack Navigator
const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <Stack.Screen
                name="CartMain"
                component={CartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: 'Checkout' }}
            />
            <Stack.Screen
                name="Payment"
                component={PaymentScreen as any}
                options={{ title: 'Payment' }}
            />
            <Stack.Screen
                name="OrderSuccess"
                component={OrderSuccessScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

// Profile Stack Navigator
const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ title: 'Change Password' }}
            />
        </Stack.Navigator>
    );
};

// Badge component for cart
const CartBadge: React.FC<{ count: number }> = ({ count }) => {
    if (count === 0) return null;

    return (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
    );
};

const MainNavigator: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📚</Text>,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Text style={{ fontSize: 24 }}>🛒</Text>
                            <CartBadge count={totalItems} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -8,
        top: -4,
        backgroundColor: Colors.error,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
});

export default MainNavigator;
