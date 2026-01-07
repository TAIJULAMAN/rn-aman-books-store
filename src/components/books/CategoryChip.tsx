import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, FontSize, Spacing } from '../../constants/Styles';

interface CategoryChipProps {
    category: string;
    isSelected: boolean;
    onPress: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
                {category}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.backgroundGray,
        marginRight: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    chipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    text: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.text,
    },
    textSelected: {
        color: Colors.white,
    },
});

export default CategoryChip;
