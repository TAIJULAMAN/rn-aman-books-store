import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Create Account' }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ title: 'Forgot Password' }}
            />
            <Stack.Screen
                name="Verification"
                component={VerificationScreen}
                options={{ title: 'Verify OTP' }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ title: 'Reset Password' }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
