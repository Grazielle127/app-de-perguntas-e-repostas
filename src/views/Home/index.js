import React from "react";
import { View } from "react-native";

// navegação
import { useNavigation } from "@react-navigation/native";
// componentes
import { Container, Title, Espaco } from './styles';
import Botao from '../../components/Botao';
import Logo from '../../components/icons/Logo';


const Home = () => {

    const navigation = useNavigation();

    return (
        <Container>
            <Title>Teste os seus conhecimentos sobre os cuidados com seu cabelo</Title>
            <Espaco>
                <View>
                    <Logo />
                </View>
            </Espaco>
            <Botao />
        </Container>

    )
}

export default Home;