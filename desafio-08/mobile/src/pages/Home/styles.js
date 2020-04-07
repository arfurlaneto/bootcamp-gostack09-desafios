import styled from 'styled-components/native';
import { darken } from 'polished';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View``;

export const ProductList = styled.FlatList``;

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 18px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ProductTitle = styled.Text.attrs({})`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  margin: 14px 0;
  margin-bottom: 14px;
  font-size: 20px;
  font-weight: bold;
`;

export const ProductButton = styled.TouchableOpacity`
  background-color: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  padding: 12px;
  color: ${darken(0.3, '#7159c1')};

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const ProductAmountIcon = styled(Icon).attrs({
  name: 'add-shopping-cart',
  size: 20
})`
  color: #fff;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;

export const ProductButtonLabel = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductButtonLabelText = styled.Text`
  flex: 1;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const Loading = styled.View`
  margin: 15px;
  padding: 10px;
  align-items: center;
`;

export const LoadingIcon = styled(Icon).attrs({
  name: 'access-time',
  size: 40
})`
  color: #fff;
`;

export const LoadingText = styled.Text`
  color: #fff;
`;

export const Error = styled.View`
  margin: 15px;
  padding: 10px;
  align-items: center;
`;

export const ErrorIcon = styled(Icon).attrs({
  name: 'error',
  size: 40
})`
  color: #fff;
`;

export const ErrorText = styled.Text`
  color: #fff;
`;
