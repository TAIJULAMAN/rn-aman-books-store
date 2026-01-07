import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthResponse } from '../models/User';
import MockDataService from '../services/MockDataService';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
    verifyOTP: (otp: string) => Promise<{ success: boolean }>;
    resetPassword: (newPassword: string) => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = '@aman_books_token';
const AUTH_USER_KEY = '@aman_books_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load stored auth data on mount
    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            const storedUser = await AsyncStorage.getItem(AUTH_USER_KEY);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response: AuthResponse = await MockDataService.login(email, password);

            await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token);
            await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));

            setToken(response.token);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response: AuthResponse = await MockDataService.signup(name, email, password);

            await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token);
            await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));

            setToken(response.token);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            await AsyncStorage.removeItem(AUTH_USER_KEY);

            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const forgotPassword = async (email: string) => {
        return await MockDataService.forgotPassword(email);
    };

    const verifyOTP = async (otp: string) => {
        return await MockDataService.verifyOTP(otp);
    };

    const resetPassword = async (newPassword: string) => {
        return await MockDataService.resetPassword(newPassword);
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
