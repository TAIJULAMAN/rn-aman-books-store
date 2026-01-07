import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: any;
    isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    isPassword = false,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[
                        styles.input,
                        ...(isFocused ? [styles.inputFocused] : []),
                        ...(error ? [styles.inputError] : []),
                    ]}
                    placeholderTextColor={Colors.textMuted}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isPassword && !showPassword}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 4,
        fontSize: FontSize.md,
        color: Colors.text,
        backgroundColor: Colors.white,
    },
    inputFocused: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: FontSize.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
    eyeIcon: {
        position: 'absolute',
        right: Spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    eyeText: {
        fontSize: 20,
    },
});

export default Input;
