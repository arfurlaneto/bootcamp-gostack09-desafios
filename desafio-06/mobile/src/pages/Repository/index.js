import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('repository').html_url;

    return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
  }
}
