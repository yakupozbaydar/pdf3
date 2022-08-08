import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

type PageOrganizerProps = {
  page: number;
  allpages: number;
};

const PageOrganizer: React.FC<PageOrganizerProps> = ({page, allpages}) => {
  const [curPage, setPage] = useState(1);
  setPage(page);
  return (
    <View>
      <View style={styles.pageView}>
        <TextInput
          editable={true}
          keyboardType={'number-pad'}
          onChangeText={newPage => setPage(newPage)}
        />
        <Text>
          {curPage}/{allpages}
        </Text>
      </View>
    </View>
  );
};

export default PageOrganizer;

const styles = StyleSheet.create({
  pageView: {
    width: 20,
    height: 40,
    borderRadius: 20,
  },
});
