import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: any;
    isPassword?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    isPassword = false,
    leftIcon,
    rightIcon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const labelAnim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(labelAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleChangeText = (text: string) => {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    const labelStyle = {
        position: 'absolute' as const,
        left: leftIcon ? 48 : Spacing.md,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [FontSize.md, FontSize.xs],
        }),
        color: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [Colors.textMuted, isFocused ? Colors.primary : Colors.textLight],
        }),
        backgroundColor: Colors.white,
        paddingHorizontal: 4,
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputWrapper}>
                {label && <Animated.Text style={labelStyle}>{label}</Animated.Text>}

                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    style={([
                        styles.input,
                        // isFocused && styles.inputFocused,
                        error && styles.inputError,
                        leftIcon && styles.inputWithLeftIcon,
                        (isPassword || rightIcon) && styles.inputWithRightIcon,
                    ].filter(Boolean) as any)}
                    placeholderTextColor={Colors.textMuted}
                    placeholder={label ? undefined : props.placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={isPassword && !showPassword}
                    value={value}
                    onChangeText={handleChangeText}
                    {...props}
                />

                {isPassword && (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                )}

                {!isPassword && rightIcon && (
                    <View style={styles.rightIcon}>{rightIcon}</View>
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
    inputWrapper: {
        position: 'relative',
    },
    input: {
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md + 2,
        fontSize: FontSize.md,
        color: Colors.text,
        backgroundColor: Colors.white,
        minHeight: 56,
    },
    inputWithLeftIcon: {
        paddingLeft: 48,
    },
    inputWithRightIcon: {
        paddingRight: 48,
    },
    // inputFocused: {
    //     borderColor: Colors.primary,
    //     shadowColor: Colors.primary,
    //     shadowOffset: {
    //         width: 0,
    //         height: 0,
    //     },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 8,
    //     elevation: 2,
    // },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: FontSize.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
        marginLeft: Spacing.xs,
    },
    leftIcon: {
        position: 'absolute',
        left: Spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex: 1,
    },
    rightIcon: {
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
