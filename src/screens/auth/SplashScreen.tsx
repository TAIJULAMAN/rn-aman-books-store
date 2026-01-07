import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { FontSize, Spacing } from '../../constants/Styles';

type AuthStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
};

interface SplashScreenProps {
    navigation: StackNavigationProp<AuthStackParamList, 'Splash'>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../../public/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Cozy Leaf Bookshop</Text>
                <Text style={styles.subtitle}>Your Digital Library</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 380,
        height: 380,
        marginBottom: Spacing.xs,
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.primaryLight,
        fontWeight: '500',
    },
});

export default SplashScreen;
