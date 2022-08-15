import * as React from 'react';

import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const Home = ({navigation}) => {
  const [result, setResult] = React.useState<Array<DocumentPickerResponse>>();
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          DocumentPicker.pick({
            type: types.pdf,
          })
            .then(setResult)
            .catch(handleError);
        }}>
        <Text>PDF Seç</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          result == null
            ? Alert.alert('lütfen pdf seçin')
            : navigation.navigate('PDFView', {result});
        }}>
        <Text>PDF Görüntüle</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop: 50,
    width: 200,
    height: 80,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
export default Home;
