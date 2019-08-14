import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Title from '@App/components/Title';
import Logo from '@App/components/Logo';

const LogoUrl = require('../assets/images/logo-birdie.svg');

interface AppProps {
  location?: any;
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
    recipient: '',
    moods: []
  };

  componentDidMount() {
    const { recipient } = this.props.location.state;

    fetch(`http://localhost:8000/recipients/${recipient}/mood`)
      .then(data => data.json())
      .then(data => {
        this.setState({ 
          recipient,
          moods: data.result });
      });
  }

  getPercentageRows = () => {
    const { moods } = this.state;

    if(moods){
      const percentages = getMoodPercentages(moods.map((mood: any) => mood.mood))
      return Object.keys(percentages).map((mood: string, index) => (
        <tr key={index}>
          <td>{mood}</td>
          <td>{percentages[mood]}</td>
        </tr>
      ))
    } else {
      return null;
    }
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Logo src={LogoUrl} />
          <Title>Moods for {this.state.recipient}</Title>
          <table>
            <thead>
              <tr>
                <th>Mood</th>
                <th>Percent</th>
              </tr>
            </thead>
            <tbody>
              {this.getPercentageRows()}
            </tbody>
          </table>
        </AppContainer>
      </>
    );
  }
}

export const getMoodPercentages = (moods: Array<string>) => {
  return getPercentages(getMoodCount(moods), moods.length);
}

export const getMoodCount = (moods: Array<string>) => {
  return moods.reduce((moodCount: object, mood) => {
    if (!moodCount[mood]) {
      moodCount[mood] = 0;
    }
    moodCount[mood]++;
    return moodCount;
  }, {});
}

export const getPercentages = (moodCount: object, total: number) => {
  return Object.keys(moodCount).reduce((percentages: object, mood) => ({
    ...percentages,
    [mood]: (100 * moodCount[mood] / total)
  }), {});
}

export default Moods;