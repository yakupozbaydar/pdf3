import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';

const PDFExample = ({params}) => {
  const source = {
    uri: params.uri,
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
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setNumber(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
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
        enableRTL
        enableAnnotationRendering
      />
      <Text>
        {curPage}/{number}
      </Text>
    </View>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default PDFExample;
