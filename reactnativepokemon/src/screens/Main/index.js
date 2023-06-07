import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import api from "../../services/api";

export default function Main() {
  const [pokemonInput, setPoke] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonView, setPokemon] = useState(null);

  async function handleBuscar() {
    try {
      const urlFinal = await api.get(`pokemon/${pokemonInput.toLowerCase()}`);

      const { status, data } = urlFinal;
      console.log(data);

      if (status != 200 || data.erro) {
        console.log("Ocorreu um erro ao buscar os modelos da pokemonInput.");
      } else {
        setPokemon(data);
        setPokemonImage(data.sprites.front_default); // Define o link da imagem do Pokémon
      }
    } catch (error) {
      console.log("Ocorreu um erro");
    }
  }

  async function handleLimpar() {
    setPoke("");
    setPokemon(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>
        PokeInfo.API
      </Text>

      {!pokemonView && (
        <TextInput
          style={styles.input}
          onChangeText={setPoke}
          onSubmitEditing={handleBuscar}
          placeholder="Search a Pokemon..."
          placeholderTextColor="#AAAAAA"
          value={pokemonInput}
        />
      )}

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={pokemonView ? handleLimpar : handleBuscar}
      >
        <Text style={styles.buttonText}>
          {pokemonView ? "Back" : "Search"}
        </Text>
      </TouchableOpacity>

      {pokemonView && (
        <View style={styles.addressarea}>

          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={{
              uri: `${pokemonImage}`,
            }}
          />

          <Text>
            <Text style={styles.exibirInfo}>Name: </Text>
            {pokemonView.name}
          </Text>

          <Text>
            <Text style={styles.exibirInfo}>Type: </Text>
            {pokemonView.types[0].type.name}
          </Text>

          <Text>
            <Text style={styles.exibirInfo}>Ability 1: </Text>
            {pokemonView.abilities[0].ability.name}
          </Text>

          <Text>
            <Text style={styles.exibirInfo}>Ability 2: </Text>
            {pokemonView.abilities[1].ability.name}
          </Text>

        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#CCCCCC" /* COR DE FUNDO - TELA */,
    flex: "1",
    padding: "20px",
  },

  tittle: {
    fontSize: "20px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },

  input: {
    backgroundColor: "#FFF", /* COR DE FUNDO - INPUT */
    borderRadius: "5px",
    color: "#000",
    fontSize: "16px",
    marginTop: "20px",
    width: "100%",

    height: "35px",
    padding: "10px",
  },

  btn: {
    alignItems: "center",
    backgroundColor: "#e02222"/* COR DO BOTAO - BUSCAR */,
    borderRadius: "5px",
    marginTop: "20px",
    padding: "8px",
    width: "100%",
  },

  buttonText: {
    color: "#000", /* COR DO TEXTO DO BOTAO - BUSCAR */
    fontSize: "18px",
    fontSeight: "bold",
    textTransform: "uppercase",
  },

  exibirInfo: {
    fontWeight: "bold",
  },

  addressarea: {
    alignItems: "left",
    marginTop: "15px",
  },
});
