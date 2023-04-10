import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av'; // SDK de áudio 
import { MotiView } from 'moti'; // Moti animacao


const perguntas = [
    {
        pergunta: 'Qual é o melhor tipo de escova para cabelos danificados?',
        opcoes: ['Escova de cerdas naturais', 'Escova com cerdas metálicas', 'Escova com cerdas de plástico', 'Escova raquete'],
        respostaCorreta: 'Escova de cerdas naturais'
    },
    {
        pergunta: 'Quais desses ingredientes são bons para hidratar cabelos secos e quebradiços?',
        opcoes: ['Sal marinho e limão', 'Óleo de coco e aloe vera', 'Vinagre e bicarbonato de sódio', 'Álcool e peróxido de hidrogênio'],
        respostaCorreta: 'Óleo de coco e aloe vera'
    },
    {
        pergunta: 'Como evitar pontas duplas?',
        opcoes: ['Usando um shampoo adstringente todos os dias', 'Usando um condicionador sem enxágue', 'Fazendo uma hidratação profunda a cada duas semanas', 'Cortando as pontas regularmente'],
        respostaCorreta: 'Cortando as pontas regularmente'
    },
    {
        pergunta: 'Qual é a frequência recomendada para lavar o cabelo?',
        opcoes: ['Todos os dias', 'Depende do tipo de cabelo e da atividade física da pessoa', 'A cada três dias', 'Uma vez por semana'],
        respostaCorreta: 'Depende do tipo de cabelo e da atividade física da pessoa'
    },
    {
        pergunta: 'O que é o co-wash?',
        opcoes: ['Um tipo de penteado para cabelos cacheados', 'Um método de limpeza do couro cabeludo com condicionador', 'Um tipo de coloração capilar', 'Um tratamento de hidratação profunda para cabelos danificados'],
        respostaCorreta: 'Um método de limpeza do couro cabeludo com condicionador'
    },
    {
        pergunta: 'Como proteger o cabelo do sol?',
        opcoes: ['Usando um chapéu ou lenço, ou aplicando um protetor solar específico para cabelos', 'Aplicando protetor solar comum', 'Aplicando um protetor solar específico para cabelos', 'Não é necessário proteger o cabelo do sol'],
        respostaCorreta: 'Usando um chapéu ou lenço, ou aplicando um protetor solar específico para cabelos'
    },
    {
        pergunta: 'Qual é o efeito do uso excessivo de chapinha e secador no cabelo?',
        opcoes: ['Deixa o cabelo mais hidratado', 'Causa ressecamento e quebra dos fios', 'Torna o cabelo mais forte e resistente', 'Acelera o crescimento dos fios'],
        respostaCorreta: 'Causa ressecamento e quebra dos fios'
    },
    {
        pergunta: 'Qual é o papel da queratina no cabelo?',
        opcoes: ['Hidratação dos fios', 'Fortalecimento dos fios', 'Limpeza do couro cabeludo', 'Proteção contra raios solares'],
        respostaCorreta: 'Fortalecimento dos fios'
    },
    {
        pergunta: 'O que é o corte bordado?',
        opcoes: ['Um corte em camadas', 'Um corte reto', 'Um corte que elimina as pontas duplas sem alterar o comprimento do cabelo', 'Um corte com franja'],
        respostaCorreta: 'Um corte que elimina as pontas duplas sem alterar o comprimento do cabelo'
    },
    {
        pergunta: 'O que é o cronograma capilar?',
        opcoes: ['Um método de lavagem do cabelo sem shampoo', 'Um método de hidratação profunda com produtos naturais', 'Um plano de cuidados para o cabelo com diferentes tratamentos em dias específicos', 'Um método de coloração capilar'],
        respostaCorreta: 'Um plano de cuidados para o cabelo com diferentes tratamentos em dias específicos'
    }
];

const Game = () => {
    const navigation = useNavigation();

    // hooks
    const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [som, setSom] = useState();
    const [respostaIncorreta, setRespostaIncorreta] = useState(false);

    //implementando a SDK de audio
    async function tocarSomCorreto() {
        const { sound: SomAcerto } = await Audio.Sound.createAsync(
            require('../../assets/sounds/acerto.mp3')
        );
        setSom(SomAcerto);
        await SomAcerto.playAsync();
    }

    async function tocarSomErrado() {
        const { sound: SomErrado } = await Audio.Sound.createAsync(
            require('../../assets/sounds/errado.mp3')
        );
        setSom(SomErrado);
        await SomErrado.playAsync();
    }

    React.useEffect(() => {
        return som
            ? () => {
                som.unloadAsync();
            }
            : undefined;
    }, [som]);

    const resposta = (opcaoSelecionada) => {
        const perguntaAtual = perguntas[perguntaAtualIndex];
        if (opcaoSelecionada === perguntaAtual.respostaCorreta) {
            setPontuacao(pontuacao + 1);
            tocarSomCorreto();
            setRespostaIncorreta(false);
        } else {
            tocarSomErrado();
            setRespostaIncorreta(true);
        }
        setPerguntaAtualIndex(perguntaAtualIndex + 1);
    }


    const pergunta = () => {
        const perguntaAtual = perguntas[perguntaAtualIndex];
        return (
            <View>
                <Text style={styles.perguntaTitulo}>{perguntaAtual.pergunta}</Text>

                {perguntaAtual.opcoes.map((opcao, index) => (
                    <View key={index} style={styles.espaco}>
                        <MotiView
                            animate={respostaIncorreta
                                ?
                                {
                                    translateX: [-0.1, 0.1, 0], rotate: [-0.1, 0.1, 0],
                                    transition: { type: 'timing', duration: 100 }
                                }
                                :
                                {
                                    scale: [1, 1.2, 1],
                                    transition: { type: 'spring', stiffness: 500, damping: 30 }
                                }
                            }
                            style={styles.buttonContainer}
                        >
                            <Button style={styles.button} title={opcao} onPress={() => resposta(opcao)} />
                        </MotiView>
                    </View>
                ))}
            </View>
        );
    }

    const pontucao = () => {
        return (
            <View>
                <Text style={styles.pontuacao} >Sua pontuação final é: {pontuacao}</Text>
                <View>
                    <Button title="Jogar de Novo" onPress={() => {
                        setPerguntaAtualIndex(0);
                        setPontuacao(0);
                        setRespostaIncorreta(false);
                        navigation.navigate('Home');
                    }} style={styles.button} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            {
                perguntaAtualIndex < perguntas.length ? pergunta() : pontucao()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    perguntaTitulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        marginVertical: 5,
    },
    espaco: {
        marginBottom: 5,
        marginTop: 5,
    },
    pontuacao: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    }
});

export default Game;
