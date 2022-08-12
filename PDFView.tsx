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
    cache: true,
  };
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf' };
  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
  //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
  //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
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
        <TextInput clearButtonMode='while-editing'
         keyboardType='number-pad'
         value={curPage}/>
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
          enableAntialiasing
          fitPolicy={2}
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
  headerContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 25,
    alignItems: "center",
  },
  goBack: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
