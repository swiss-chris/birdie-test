import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom'

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import SubTitle from '@App/components/SubTitle';
import Recipient from '@App/components/Recipient';

const LogoUrl = require('../assets/images/logo-birdie.svg');

interface AppProps {

}

interface AppState {

}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class App extends React.Component<AppProps, AppState> {

  // TODO add access qualifiers (private ?)
  state = {
    recipients: []
  };

  componentDidMount() {
    fetch('http://localhost:8000/recipients')
      .then(data => data.json())
      .then(data => {
        this.setState({ recipients: data.result });
      });
  }

  public render() {
    const { recipients } = this.state;
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Care Recipients</Title>
          <SubTitle>Please click on a care recipient below</SubTitle>
          {
            recipients && recipients.length && recipients.map((recipient, index) => (
              <Link
                key={index}
                to={{
                  pathname: '/moods',
                  state: {
                    recipient
                  }
                }}
              >
                <Recipient key={index}>{recipient}</Recipient>
              </Link>
            )
            )
          }
        </AppContainer>
      </>
    );
  }
}

export default App; 