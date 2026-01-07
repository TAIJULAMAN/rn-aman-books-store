import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface ProfileScreenProps {
    navigation: NavigationProp<any>;
}

interface MenuItem {
    icon: string;
    title: string;
    onPress: () => void;
    color?: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                },
            },
        ]);
    };

    const menuItems: MenuItem[] = [
        {
            icon: '👤',
            title: 'Edit Profile',
            onPress: () => Alert.alert('Coming Soon', 'Edit profile feature coming soon!'),
        },
        {
            icon: '🔒',
            title: 'Change Password',
            onPress: () => navigation.navigate('ChangePassword'),
        },
        {
            icon: '📦',
            title: 'Order History',
            onPress: () => Alert.alert('Coming Soon', 'Order history feature coming soon!'),
        },
        {
            icon: '⚙️',
            title: 'Settings',
            onPress: () => Alert.alert('Coming Soon', 'Settings feature coming soon!'),
        },
        {
            icon: '❓',
            title: 'Help & Support',
            onPress: () => Alert.alert('Coming Soon', 'Help & support feature coming soon!'),
        },
        {
            icon: '🚪',
            title: 'Logout',
            onPress: handleLogout,
            color: Colors.error,
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* User Info */}
            <View style={styles.userContainer}>
                <Image
                    source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        <View style={styles.menuItemLeft}>
                            <Text style={styles.menuIcon}>{item.icon}</Text>
                            <Text
                                style={[
                                    styles.menuTitle,
                                    ...(item.color ? [{ color: item.color }] : []),
                                ]}
                            >
                                {item.title}
                            </Text>
                        </View>
                        <Text style={styles.menuArrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* App Version */}
            <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
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
    },
    userContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.md,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    userName: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    userEmail: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
    menuContainer: {
        backgroundColor: Colors.white,
        marginBottom: Spacing.lg,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 24,
        marginRight: Spacing.md,
    },
    menuTitle: {
        fontSize: FontSize.md,
        color: Colors.text,
        fontWeight: '500',
    },
    menuArrow: {
        fontSize: 24,
        color: Colors.textMuted,
    },
    version: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        textAlign: 'center',
        marginVertical: Spacing.xl,
    },
});

export default ProfileScreen;
