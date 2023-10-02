import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_100Thin,
} from "@expo-google-fonts/roboto";
import { TextInput } from "react-native-gesture-handler";
import Color from "../../constants/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { db } from "../../services/firebaseConfig";
import {
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

interface checkboxStruct {
  id: string;
  exercise: string;
  exerciseType: string;
  checked: boolean;
}

const Prescricao = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [inputText, setInputText] = React.useState<string>("");
  const [checkboxes, setCheckboxes] = React.useState<checkboxStruct[]>([]);
  const [selectedButton, setSelectedButton] = React.useState<string>("");

  useEffect(() => {
    const collectionRef = collection(db, "exerciseTypes");
    onSnapshot(collectionRef, (snapshot) => {
      let prescriptions: checkboxStruct[] = [];

      snapshot.docs.forEach((doc) => {
        let data = doc.data();
        prescriptions.push({
          id: doc.id,
          exercise: data.name,
          exerciseType: data.type,
          checked: false,
        });
      });

      //ordena os treinos em ordem alfabetica
      prescriptions.sort((a, b) => {
        const prescriptionA = a.exercise.toLowerCase();
        const prescriptionB = b.exercise.toLowerCase();

        if (prescriptionA < prescriptionB) {
          return -1;
        } else if (prescriptionA > prescriptionB) {
          return 1;
        } else {
          return 0;
        }
      });

      setCheckboxes(prescriptions);
      //console.log("pre",prescriptions)
    });
  }, []);

  const toggleCheckbox = (
    checkboxToSwitch: checkboxStruct,
    value?: boolean
  ) => {
    if (value) {
      checkboxToSwitch.checked = value;
    } else {
      checkboxToSwitch.checked = !checkboxToSwitch.checked;
    }

    setCheckboxes([...checkboxes]);
  };

  const handleSavePress = () => {
    const checkedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    const chosenExercises = checkedCheckboxes.map(
      (checkbox) => checkbox.exercise
    );

    //vai para a pagina de especificaçao enviando os exercicios escolhidos
    navigation.navigate("prescricao-especificacao", {
      exercises: chosenExercises,
    });
    // router.push({ 'pathname': '../prescricao-especificacao/prescricao-especificacao', params: { 'exercises': chosenExercises } });
  };
  const handleOptionPress = (value: string) => {
    if (selectedButton == value) {
      setSelectedButton("");
    } else setSelectedButton(value);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  const handleWorkout = () => {
    navigation.navigate("workout");
  };

  const handleSubmit = () => {
    //alert('pesquisa por: ' + inputText);
  };

  const options = [
    { value: "Peito"},
    { value: "Tríceps"},
    { value: "Ombros" },
    { value: "Costas" },
    { value: "Bíceps" },
    { value: "Pernas" },
    { value: "Glúteos" },
  ];

  const [fontLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  // Filtrar os exercícios com base na opção selecionada e no texto de pesquisa
  const filteredExercises = checkboxes.filter((checkbox) => {
    const matchesText = checkbox.exercise
      .toLowerCase()
      .includes(inputText.toLowerCase());

    // Se nenhuma opção estiver selecionada, exibir todos os exercícios
    const matchesType =
      !selectedButton || checkbox.exerciseType === selectedButton;

    return matchesText && matchesType;
  });

  return (
    <View style={styles.prescricaoTreinos}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 17 }}>
            Prescrição
          </Text>
        </View>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleWorkout()}
        >
          <Text style={styles.postButtonText}>Workout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.exerciseTypesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.exerciseTypes}
          >
            {options.map((option, index) => (
              <Pressable
                key={option.value}
                style={
                  selectedButton === option.value
                    ? [styles.exerciseType, styles.selected]
                    : styles.exerciseType
                }
                onPress={() => handleOptionPress(option.value)}
              >
                <Text
                  style={
                    selectedButton === option.value
                      ? [styles.exerciseTypeText, styles.selected]
                      : styles.exerciseTypeText
                  }
                >
                  {option.value}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.searchBar}>
          <View style={[styles.inputField]}>
            <TextInput
              style={styles.searchText}
              placeholder="Pesquisar"
              placeholderTextColor="#1B006266"
              onChangeText={handleInputChange}
              value={inputText}
            />
            <Pressable onPress={handleSubmit}>
              <Image
                style={[styles.icon]}
                resizeMode="contain"
                source={require("../../assets/images/search.png")}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.exercisesWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.exercises}
          >
            {filteredExercises.map((checkbox, index) => (
              <View key={checkbox.id} style={styles.exercise}>
                <TouchableOpacity
                  style={
                    checkbox.checked
                      ? [styles.checkbox, styles.checked]
                      : styles.checkbox
                  }
                  onPress={() => toggleCheckbox(checkbox)}
                >
                  <Image
                    style={[styles.icon, styles.checkIcon]}
                    resizeMode="contain"
                    source={require("../../assets/images/checkmark.png")}
                  />
                </TouchableOpacity>
                <View style={styles.exerciseTexts}>
                  <Text style={styles.exerciseText}>{checkbox.exercise}</Text>
                  <Text style={styles.exerciseTextSmall}>
                    {" "}
                    {checkbox.exerciseType}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.buttonWrapper}>
              <Pressable style={styles.button} onPress={handleSavePress}>
                <Text style={styles.buttonText}>Continuar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prescricaoTreinos: {
    color: Color.prescricao.light_gray,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    maxWidth: 550,
    backgroundColor: Color.prescricao.white,
  },
  headerMobile: {
    width: "100%",
    padding: 20,
    paddingTop: 30,
    alignSelf: "stretch",
    backgroundColor: Color.prescricao.purple,
    flexDirection: "row",
  },
  body: {
    paddingBottom: 44,
    height: "93%",
    width: "100%",
    minHeight: 500,
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerText: {
    paddingLeft: 12,
    color: Color.prescricao.white,
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
  },
  exerciseTypesWrapper: {
    height: 40,
    margin: 12,
    marginBottom: 16,
  },
  exerciseTypes: {
    display: "flex",
    flexDirection: "row",
    columnGap: 12,
    boxSizing: "contentBox",
    width: "100%",
    overflowX: "hidden",
  },
  exerciseTypeText: {
    fontSize: 16,
    textAlign: "center",
    color: "#4b0082",
    fontFamily: "Roboto_700Bold",
    borderRadius: 20,
  },
  exerciseType: {
    borderRadius: 20,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b0082",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  inputField: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 2,
    width: "80%",
    height: 42,
    borderWidth: 2,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#4b0082",
    borderStyle: "solid",
    backgroundColor: Color.prescricao.white,
  },
  searchBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  searchText: {
    width: "90%",
    fontSize: 16,
    marginRight: 8,
  },
  exercisesWrapper: {
    marginTop: 12,
    width: "100%",
    height: "72%",
  },
  exercises: {
    flexDirection: "column",
    width: "100%",
    margin: "auto",
  },
  exercise: {
    backgroundColor: Color.prescricao.purple,
    borderRadius: 14,
    height: 70,
    width: 240,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    marginBottom: 8,
  },
  checkbox: {
    height: 26,
    width: 26,
    borderWidth: 0,
    borderColor: Color.prescricao.white,
    backgroundColor: Color.prescricao.white,
    borderStyle: "solid",
    borderRadius: 3,
    marginHorizontal: 16,
    marginTop: "auto",
    marginBottom: "auto",
  },
  checkIcon: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  checked: {
    backgroundColor: Color.prescricao.purple,
    borderWidth: 0,
  },
  exerciseTexts: {
    marginTop: "auto",
    marginBottom: "auto",
    flex: 1,
    marginRight: 26,
  },
  exerciseText: {
    color: Color.prescricao.white,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
  },
  exerciseTextSmall: {
    color: Color.prescricao.white,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
  },
  buttonWrapper: {
    marginTop: 16,
  },
  button: {
    alignSelf: "center",
    width: 200,
    padding: 12,
    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: Color.prescricao.purple,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  selected: {
    backgroundColor: Color.prescricao.purple,
    color: Color.prescricao.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginTop: 45,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  postButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Prescricao;
