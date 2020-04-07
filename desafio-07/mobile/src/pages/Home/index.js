import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  ProductList,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductButton,
  ProductAmount,
  ProductAmountIcon,
  ProductAmountText,
  ProductButtonLabelText,
  Loading,
  LoadingText,
  LoadingIcon,
  Error,
  ErrorText,
  ErrorIcon
} from './styles';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  state = {
    loading: false,
    error: false,
    products: []
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      this.setState({ products: data });
    } catch {
      this.setState({ error: true });
    }

    this.setState({ loading: false });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products, loading, error } = this.state;
    const { amount } = this.props;

    return (
      <Container>
        {!loading ? (
          <></>
        ) : (
          <Loading>
            <LoadingIcon />
            <LoadingText>Carregando produtos...</LoadingText>
          </Loading>
        )}

        {!error ? (
          <></>
        ) : (
          <Error>
            <ErrorIcon />
            <ErrorText>Erro ao carregar os produtos.</ErrorText>
          </Error>
        )}

        {loading || error ? (
          <></>
        ) : (
          <ProductList
            data={products}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <Product>
                <ProductImage source={{ uri: item.image }} />
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{item.priceFormatted}</ProductPrice>
                <ProductButton onPress={() => this.handleAddProduct(item.id)}>
                  <ProductAmount>
                    <ProductAmountIcon />
                    <ProductAmountText>
                      {amount[item.id] || 0}
                    </ProductAmountText>
                  </ProductAmount>
                  <ProductButtonLabelText>ADICIONAR</ProductButtonLabelText>
                </ProductButton>
              </Product>
            )}
            horizontal
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
