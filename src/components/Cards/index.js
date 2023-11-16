import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

export function Cards(props) {
  const data = props.data;
  const onPress = props.onPress;

  const [passwordIsVisible, setpasswordIsVisible] = useState(false);
  function togglePasswordIsVisible() {
    setpasswordIsVisible((prevState) => !prevState);
  }
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={togglePasswordIsVisible}>
      <MaterialIcons
        name={passwordIsVisible ? "visibility" : "visibility-off"}
        size={22}
        color="#888D97"
      />
    </TouchableOpacity>

    <View style={styles.content}>
      <View>
        <Text style={styles.title}>
          {data.nome}
        </Text>

        {
          passwordIsVisible
            ?
            <Text style={styles.password}>
              {data.senha}
            </Text>
            :
            <Text style={styles.email}>
              {data.usuario}
            </Text>
        }
      </View>
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <MaterialIcons
        name="delete"
        size={22}
        color="#888D97"
      />
    </TouchableOpacity>
  </View>
  );
}
