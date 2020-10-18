import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderPropriedades {
    titule: string;
    // o ? significa que o dado não é obrigatorio
    showCancel?:boolean;
}
export default function Header({titule, showCancel = true}: HeaderPropriedades){
    const navigation = useNavigation();

    function handleGoBackToAppHome(){
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6"/>
            </BorderlessButton>
            <Text style={styles.titulo}>{titule}</Text>
            {
                showCancel ? (
                    <BorderlessButton onPress={handleGoBackToAppHome}>
                        <Feather name="x" size={24} color="#ff669d"/>
                    </BorderlessButton>
                ) : (
                    <View/>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titulo: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16
    }
})