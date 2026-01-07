import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, Spacing } from '../../constants/Styles';

interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
    elevated?: boolean;
}

const Card: React.FC<CardProps> = ({ children, style, elevated = true }) => {
    return (
        <View style={[styles.card, elevated && styles.shadow, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default Card;
