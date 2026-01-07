import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface VerificationScreenProps {
    navigation: NavigationProp<any>;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({ navigation }) => {
    const { verifyOTP } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 4) {
            Alert.alert('Error', 'Please enter the complete OTP');
            return;
        }

        setLoading(true);
        try {
            await verifyOTP(otpCode);
            Alert.alert('Success', 'OTP verified successfully', [
                { text: 'OK', onPress: () => navigation.navigate('ResetPassword') },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>✉️</Text>
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>
                    Enter the 4-digit code sent to your email
                </Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                <Button title="Verify" onPress={handleVerify} loading={loading} />

                <Text style={styles.resendText}>
                    Didn't receive the code?{' '}
                    <Text style={styles.resendLink}>Resend</Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xxl * 2,
    },
    emoji: {
        fontSize: 60,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        fontSize: FontSize.xxl,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.text,
    },
    resendText: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
        textAlign: 'center',
        marginTop: Spacing.lg,
    },
    resendLink: {
        color: Colors.primary,
        fontWeight: '700',
    },
});

export default VerificationScreen;
