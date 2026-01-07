import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors, { Gradients } from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
    gradient?: keyof typeof Gradients;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    gradient = 'primary',
    disabled = false,
    loading = false,
    icon,
    fullWidth = false,
    style,
    ...props
}) => {
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

    const buttonStyle = [
        styles.button,
        fullWidth && styles.fullWidth,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'outline' && styles.buttonOutline,
        disabled && styles.buttonDisabled,
        style,
    ];

    const textStyle = [
        styles.text,
        variant === 'secondary' && styles.textSecondary,
        variant === 'outline' && styles.textOutline,
        disabled && styles.textDisabled,
    ];

    const content = (
        <>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? Colors.primary : Colors.white}
                />
            ) : (
                <>
                    {icon && icon}
                    <Text style={textStyle}>{title}</Text>
                </>
            )}
        </>
    );

    if (variant === 'gradient') {
        return (
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidth]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={disabled || loading}
                    activeOpacity={0.8}
                    {...props}
                >
                    <LinearGradient
                        colors={Gradients[gradient]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.button, styles.gradientButton, disabled && styles.buttonDisabled]}
                    >
                        {content}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={0.8}
                {...props}
            >
                {content}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: Spacing.sm,
        minHeight: 50,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    gradientButton: {
        backgroundColor: 'transparent',
    },
    fullWidth: {
        width: '100%',
    },
    buttonSecondary: {
        backgroundColor: Colors.backgroundGray,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonDisabled: {
        backgroundColor: Colors.border,
        shadowOpacity: 0,
        elevation: 0,
    },
    text: {
        color: Colors.white,
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    textSecondary: {
        color: Colors.text,
    },
    textOutline: {
        color: Colors.primary,
    },
    textDisabled: {
        color: Colors.textMuted,
    },
});

export default Button;
