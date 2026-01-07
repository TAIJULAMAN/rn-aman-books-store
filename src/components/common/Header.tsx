import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Colors, { Gradients } from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface HeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    rightComponent?: React.ReactNode;
    onBackPress?: () => void;
    variant?: 'gradient' | 'solid' | 'transparent';
    gradient?: 'primary' | 'accent' | 'tealPurple';
}

const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    showBack = true,
    rightComponent,
    onBackPress,
    variant = 'gradient',
    gradient = 'primary',
}) => {
    const navigation = useNavigation();
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handleBackPress = () => {
        // Animate button press
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    const getGradientColors = () => {
        switch (gradient) {
            case 'accent':
                return Gradients.accent;
            case 'tealPurple':
                return Gradients.tealPurple;
            default:
                return Gradients.primary;
        }
    };

    const containerStyle = [
        styles.container,
        variant === 'solid' && styles.solidContainer,
        variant === 'transparent' && styles.transparentContainer,
    ];

    const content = (
        <View style={styles.content}>
            {/* Back Button */}
            {showBack && (
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <View style={styles.backIconContainer}>
                            <Text style={styles.backIcon}>←</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Title Section */}
            <View style={[styles.titleContainer, !showBack && styles.titleContainerNoBack]}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Right Component */}
            {rightComponent && (
                <View style={styles.rightContainer}>{rightComponent}</View>
            )}
        </View>
    );

    if (variant === 'gradient') {
        return (
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={containerStyle}
            >
                {content}
            </LinearGradient>
        );
    }

    return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Spacing.xxl,
        paddingBottom: Spacing.md,
        paddingHorizontal: Spacing.lg,
    },
    solidContainer: {
        backgroundColor: Colors.primary,
    },
    transparentContainer: {
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: Spacing.sm,
    },
    backIconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '700',
    },
    titleContainer: {
        flex: 1,
        marginLeft: Spacing.xs,
    },
    titleContainerNoBack: {
        marginLeft: 0,
    },
    title: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.white,
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: 'rgba(255, 255, 255, 0.85)',
        marginTop: 2,
    },
    rightContainer: {
        marginLeft: Spacing.md,
    },
});

export default Header;
