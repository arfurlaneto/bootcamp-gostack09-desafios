import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingIssues = styled.div`
  height: 500px;
  margin-top: 15px;
  color: #cacaca;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IssuesFilter = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #666;

  span {
    margin-right: 10px;
  }

  select {
    padding: 2px;
    border-radius: 2px;
    width: 200px;
    font-size: 14px;
    color: #666;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          height: 20px;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Paginator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  div {
    height: 25px;
    font-size: 14px;
    color: #7159c1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    font-size: 14px;
    color: #7159c1;
    background: #fff;
    border: 1px solid #7159c1;
    border-radius: 4px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
