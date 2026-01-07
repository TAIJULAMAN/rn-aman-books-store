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
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

interface ChangePasswordScreenProps {
    navigation: NavigationProp<any>;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        if (oldPassword === newPassword) {
            Alert.alert('Error', 'New password must be different from old password');
            return;
        }

        setLoading(true);

        // Simulate password change
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Password changed successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>🔐</Text>
                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.subtitle}>
                    Enter your current password and choose a new one
                </Text>

                <Input
                    label="Current Password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    isPassword
                />

                <Input
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    isPassword
                />

                <Input
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    isPassword
                />

                <Button
                    title="Change Password"
                    onPress={handleChangePassword}
                    loading={loading}
                />
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
        paddingTop: Spacing.xl,
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

export default ChangePasswordScreen;
