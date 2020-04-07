import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const amount = useSelector(state =>
    state.cart.reduce((stock, product) => {
      stock[product.id] = product.amount;
      return stock;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      setError(false);
      setLoading(true);

      try {
        const response = await api.get('products');

        const data = response.data.map(product => ({
          ...product,
          priceFormatted: formatPrice(product.price)
        }));

        setProducts(data);
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

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
              <ProductButton onPress={() => handleAddProduct(item.id)}>
                <ProductAmount>
                  <ProductAmountIcon />
                  <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
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
