import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookCategory } from '../../models/Book';
import Colors, { Gradients } from '../../constants/Colors';
import { FontSize, Spacing, BorderRadius } from '../../constants/Styles';

interface CategoryChipProps {
    category: BookCategory | 'All';
    selected: boolean;
    onPress: () => void;
}

const categoryGradients: Record<string, string[]> = {
    All: Gradients.primary,
    Fiction: Gradients.accent,
    Tech: Gradients.success,
    'Sci-Fi': Gradients.tealPurple,
    Romance: ['#EC4899', '#F472B6'],
    Mystery: Gradients.dark,
};

const CategoryChip: React.FC<CategoryChipProps> = ({
    category,
    selected,
    onPress,
}) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    if (selected) {
        return (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={1}
                >
                    <LinearGradient
                        colors={categoryGradients[category] || Gradients.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.chipSelected}
                    >
                        <Text style={styles.textSelected}>{category}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={styles.chip}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.sm,
        backgroundColor: Colors.backgroundGray,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    chipSelected: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.sm,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.text,
    },
    textSelected: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.white,
    },
});

export default CategoryChip;
