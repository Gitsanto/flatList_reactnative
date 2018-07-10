import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { Constants } from 'expo';
// import img_data from './data.json'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
let data =[]
 export default class App extends React.PureComponent {

  state = {
    selected: (new Map(): Map<string, boolean>),
  
    };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <View  style={styles.paragraph}>
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.key}
      
    />
    </View>
   
  );

  render() {
    return (
      <View style={styles.container}>
      <FlatList
      
       data={[{id:1,key: 'good'}, {id:2,key: 'this is'}]}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
       
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    width: 150, height: 150, backgroundColor: 'steelblue',
  },
});
