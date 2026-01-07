import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

type AuthStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
};

interface OnboardingSlide {
    id: string;
    emoji: string;
    title: string;
    description: string;
}

const slides: OnboardingSlide[] = [
    {
        id: '1',
        emoji: '📖',
        title: 'Discover Books',
        description: 'Browse thousands of books across multiple genres and categories',
    },
    {
        id: '2',
        emoji: '🛒',
        title: 'Easy Shopping',
        description: 'Add books to your cart and checkout with a seamless experience',
    },
    {
        id: '3',
        emoji: '🚀',
        title: 'Start Reading',
        description: 'Get your favorite books delivered and start your reading journey',
    },
];

interface OnboardingScreenProps {
    navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('SignIn');
        }
    };

    const handleSkip = () => {
        navigation.replace('SignIn');
    };

    const renderSlide = ({ item }: { item: OnboardingSlide }) => (
        <View style={styles.slide}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const renderPagination = () => (
        <View style={styles.pagination}>
            {slides.map((_, index) => (
                <View
                    key={index}
                    style={[styles.dot, index === currentIndex && styles.dotActive]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

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

            {renderPagination()}

            <View style={styles.buttonContainer}>
                <Button
                    title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                    onPress={handleNext}
                />
            </View>
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
    },
    skipText: {
        fontSize: FontSize.md,
        color: Colors.primary,
        fontWeight: '600',
    },
    slide: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
    },
    emoji: {
        fontSize: 100,
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    description: {
        fontSize: FontSize.md,
        color: Colors.textLight,
        textAlign: 'center',
        lineHeight: 24,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.border,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: Colors.primary,
        width: 24,
    },
    buttonContainer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
});

export default OnboardingScreen;
