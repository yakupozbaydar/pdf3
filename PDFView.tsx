/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFView: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  let data = route?.params?.result[0].uri;
  const source = {
    uri: data,
    cache: false,
  };
  const [curPage, setPage] = useState(0);
  const [number, setNumber] = useState(0);
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => {
          navigation.goBack();
        }}>
          <Text style={{ fontSize: 16 }}>Geri</Text>
        </TouchableOpacity>
        <TextInput
        style={styles.input} clearButtonMode="while-editing"
          keyboardType="numeric"
          onChangeText={(e) => setPage(Number(e))}
          clearTextOnFocus
          />
      </View>
      <View style={styles.container}>
        <Pdf
          maxScale={1000}
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages) => {
            setNumber(numberOfPages);
          }}
          onPageChanged={page => {
            setPage(page);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
          enablePaging
          page={curPage}
        />
        <Text >
          {curPage}/{number}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input : {
    borderWidth:1,
    marginRight:10,
    height:50,
    width:40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 25,
    alignItems: 'center',
  },
  goBack: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  }
  ,
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
export default PDFView;
