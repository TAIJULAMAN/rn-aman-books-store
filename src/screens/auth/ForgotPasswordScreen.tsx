import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

interface ForgotPasswordScreenProps {
    navigation: NavigationProp<any>;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        setLoading(true);
        try {
            const result = await forgotPassword(email);
            Alert.alert('Success', result.message, [
                { text: 'OK', onPress: () => navigation.navigate('Verification') },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to send reset link');
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
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                    Enter your email and we'll send you a link to reset your password
                </Text>

                <Input
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Button title="Send Reset Link" onPress={handleSubmit} loading={loading} />
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
        lineHeight: 20,
    },
});

export default ForgotPasswordScreen;
