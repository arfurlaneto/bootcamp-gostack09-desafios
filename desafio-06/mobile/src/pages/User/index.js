import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: false,
    loadingMore: false,
    listEnded: false,
  };

  async componentDidMount() {
    await this.load();
  }

  load = async () => {
    this.setState({
      loading: true,
      page: 1,
      listEnded: false,
    });

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: 1 },
    });

    this.setState({
      stars: response.data,
      loading: false,
    });
  };

  loadMore = async () => {
    const { listEnded } = this.state;

    if (listEnded) {
      return;
    }

    this.setState({ loadingMore: true });

    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars, page } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: page + 1,
      },
    });

    if (response.data.length) {
      this.setState({
        stars: [...stars, ...response.data],
        page: page + 1,
      });
    } else {
      this.setState({
        listEnded: true,
      });
    }

    this.setState({
      loadingMore: false,
    });
  };

  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, loadingMore } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.load}
            refreshing={loading}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            )}
          />
        )}
        {loadingMore ? <ActivityIndicator color="#7159c1" /> : null}
      </Container>
    );
  }
}
