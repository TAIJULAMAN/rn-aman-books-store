import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
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

interface SignUpScreenProps {
    navigation: NavigationProp<any>;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await signup(name, email, password);
            // Navigation will be handled automatically by AuthContext
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.logo}>📚</Text>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                    />

                    <Input
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        isPassword
                    />

                    <Button title="Sign Up" onPress={handleSignUp} loading={loading} />

                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginTop: Spacing.xxl * 2,
        marginBottom: Spacing.xl,
    },
    logo: {
        fontSize: 60,
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.textLight,
    },
    form: {
        flex: 1,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    signInText: {
        fontSize: FontSize.sm,
        color: Colors.textLight,
    },
    signInLink: {
        fontSize: FontSize.sm,
        color: Colors.primary,
        fontWeight: '700',
    },
});

export default SignUpScreen;
