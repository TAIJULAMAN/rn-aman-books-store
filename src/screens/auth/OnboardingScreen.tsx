import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors, { Gradients } from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';
import Button from '../../components/common/Button';

const { width, height } = Dimensions.get('window');

type AuthStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
};

interface OnboardingSlide {
    id: string;
    emoji: string;
    title: string;
    description: string;
    gradient: string[];
    design: 'floating' | 'circular' | 'wave';
}

const slides: OnboardingSlide[] = [
    {
        id: '1',
        emoji: '🍃',
        title: 'Your Cozy Corner',
        description: 'Step into a world of stories. Discover handpicked books that speak to your soul',
        gradient: Gradients.primary,
        design: 'floating',
    },
    {
        id: '2',
        emoji: '✨',
        title: 'Curated Collections',
        description: 'From bestsellers to hidden gems, find your next favorite read in our carefully selected catalog',
        gradient: Gradients.accent,
        design: 'circular',
    },
    {
        id: '3',
        emoji: '📚',
        title: 'Read & Relax',
        description: 'Order with ease, delivered to your doorstep. Your literary journey starts here',
        gradient: Gradients.tealPurple,
        design: 'wave',
    },
];

interface OnboardingScreenProps {
    navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        } else {
            navigation.replace('SignIn');
        }
    };

    const handleSkip = () => {
        navigation.replace('SignIn');
    };

    const renderFloatingDesign = (item: OnboardingSlide) => (
        <Animated.View
            style={[
                styles.designContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.floatingCircle1} />
            <View style={styles.floatingCircle2} />
            <View style={styles.floatingCircle3} />
            <Text style={styles.emoji}>{item.emoji}</Text>
        </Animated.View>
    );

    const renderCircularDesign = (item: OnboardingSlide) => (
        <Animated.View
            style={[
                styles.designContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <View style={styles.circularRing1} />
            <View style={styles.circularRing2} />
            <View style={styles.circularRing3} />
            <Text style={styles.emoji}>{item.emoji}</Text>
        </Animated.View>
    );

    const renderWaveDesign = (item: OnboardingSlide) => (
        <Animated.View
            style={[
                styles.designContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.wave1} />
            <View style={styles.wave2} />
            <View style={styles.wave3} />
            <Text style={styles.emoji}>{item.emoji}</Text>
        </Animated.View>
    );

    const renderSlide = ({ item }: { item: OnboardingSlide }) => (
        <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.slide}
        >
            <View style={styles.slideContent}>
                {/* Design based on slide type */}
                {item.design === 'floating' && renderFloatingDesign(item)}
                {item.design === 'circular' && renderCircularDesign(item)}
                {item.design === 'wave' && renderWaveDesign(item)}

                {/* Text Content */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </Animated.View>
            </View>
        </LinearGradient>
    );

    const renderPagination = () => (
        <View style={styles.pagination}>
            {slides.map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentIndex && styles.dotActive,
                        {
                            opacity: index === currentIndex ? 1 : 0.5,
                        },
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                keyExtractor={(item) => item.id}
            />

            <LinearGradient
                colors={slides[currentIndex].gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bottomSection}
            >
                {renderPagination()}

                {/* Next Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.whiteButton}
                        onPress={handleNext}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.whiteButtonText}>
                            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: Spacing.lg,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
    },
    skipText: {
        fontSize: FontSize.sm,
        color: Colors.white,
        fontWeight: '700',
    },
    slide: {
        width,
        flex: 1,
    },
    slideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 180, // Space for bottom section
    },
    designContainer: {
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    // Floating Design
    floatingCircle1: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        top: 20,
        left: 20,
    },
    floatingCircle2: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        bottom: 40,
        right: 30,
    },
    floatingCircle3: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        top: 100,
        right: 20,
    },
    // Circular Design
    circularRing1: {
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    circularRing2: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    circularRing3: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    // Wave Design
    wave1: {
        position: 'absolute',
        width: 280,
        height: 140,
        borderRadius: 140,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        top: 0,
    },
    wave2: {
        position: 'absolute',
        width: 240,
        height: 120,
        borderRadius: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        top: 60,
    },
    wave3: {
        position: 'absolute',
        width: 200,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        top: 120,
    },
    emoji: {
        fontSize: 100,
        zIndex: 10,
    },
    textContainer: {
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    description: {
        fontSize: FontSize.md,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: Spacing.lg,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.white,
        marginHorizontal: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.white,
    },
    buttonContainer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    whiteButton: {
        backgroundColor: Colors.white,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    whiteButtonText: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default OnboardingScreen;
