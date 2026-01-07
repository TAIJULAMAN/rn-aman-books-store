import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = () => {
        if (disabled) return styles.buttonDisabled;

        switch (variant) {
            case 'secondary':
                return styles.buttonSecondary;
            case 'outline':
                return styles.buttonOutline;
            default:
                return styles.buttonPrimary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'outline':
                return styles.textOutline;
            default:
                return styles.textPrimary;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.white} />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
    },
    buttonSecondary: {
        backgroundColor: Colors.primaryLight,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    buttonDisabled: {
        backgroundColor: Colors.border,
    },
    text: {
        fontSize: FontSize.md,
        fontWeight: '600',
    },
    textPrimary: {
        color: Colors.white,
    },
    textOutline: {
        color: Colors.primary,
    },
});

export default Button;
