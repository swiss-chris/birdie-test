import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

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

class Moods extends React.Component<AppProps, AppState> {

  // TODO add access qualifiers (private ?)
  state = {
    moods: []
  };

  componentDidMount() {
    fetch('http://localhost:8000/recipients/ad3512a6-91b1-4d7d-a005-6f8764dd0111/mood')
      .then(data => data.json())
      .then(data => {
        this.setState({ moods: data.result });
      });
  }

  public render() {
    const { moods } = this.state;
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Moods for {"Care Recipient X"}</Title>
          {
            moods && moods.length && moods.map((mood: any, index) => (
              <p key={index}>{mood.mood}</p>
            ))
          }
        </AppContainer>
      </>
    );
  }
}

export default Moods;