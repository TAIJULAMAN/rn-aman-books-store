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

interface ResetPasswordScreenProps {
    navigation: NavigationProp<any>;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
    const { resetPassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(newPassword);
            Alert.alert('Success', 'Password reset successfully', [
                { text: 'OK', onPress: () => navigation.navigate('SignIn') },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to reset password');
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
                <Text style={styles.emoji}>🔑</Text>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your new password
                </Text>

                <Input
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    isPassword
                />

                <Input
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    isPassword
                />

                <Button title="Reset Password" onPress={handleReset} loading={loading} />
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
});

export default ResetPasswordScreen;
