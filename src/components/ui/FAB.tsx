import React from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;


    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, onPress, style }: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgba(0, 0, 255, 0.7)' : 'blue'
                    },
                    styles.btn
                ]}
            >
                <Icon name={iconName} size={30} color="white" />
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    btn: {
        zIndex: 1,
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 4.5,
            height: 0.27
        },
        elevation: 5
    }
})
