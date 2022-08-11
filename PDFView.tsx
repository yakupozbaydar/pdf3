/* eslint-disable prettier/prettier */
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';

const PDFView: React.FC = () => {
  const route = useRoute();
  let data;
  data = route?.params.result[0].uri;
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
        />
        <Text>
          {curPage}/{number}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
export default PDFView;
