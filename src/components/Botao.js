import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Botao = () => {
    const navigation = useNavigation();

    return (
        <Estilo onPress={() => navigation.navigate('Jogo')}>
            <BotaoText>Começar</BotaoText>
        </Estilo>
    )
}

const Estilo = styled.TouchableOpacity`
    background-color: #76FF73;
    width: 250px;
    height: 80px;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`

export const BotaoText = styled.Text`
    color: #FFFFFF;
    font-size: 40px;
    text-align: center;
`

export default Botao;






