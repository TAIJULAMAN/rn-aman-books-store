import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../../constants/Colors';

interface GradientViewProps {
    colors?: string[];
    gradient?: keyof typeof Gradients;
    children?: React.ReactNode;
    style?: ViewStyle;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
}

const GradientView: React.FC<GradientViewProps> = ({
    colors,
    gradient = 'primary',
    children,
    style,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
}) => {
    const gradientColors = colors || Gradients[gradient];

    return (
        <LinearGradient
            colors={gradientColors}
            start={start}
            end={end}
            style={[styles.container, style]}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default GradientView;
