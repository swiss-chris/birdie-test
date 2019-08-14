import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Moods, {getMoodCount, getPercentages, getMoodPercentages} from './Moods';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Moods />
      ,div);
});

// TODO test corner cases

it('returns correct percentages for count object', () => {
  const moods = [
    "happy",
    "sad",
    "happy",
    "okay",
    "sad",
  ];

  const expected = {
    happy: 40,
    sad: 40,
    okay: 20 
  };

  expect(getMoodPercentages(moods)).toEqual(expected);
});

it('returns correct counts for moods array', () => {
  const moods = [
    "happy",
    "sad",
    "happy",
    "okay",
    "sad",
  ];

  const expected = {
    happy: 2,
    sad: 2,
    okay: 1
  };

  // TODO use proper types
  expect(getMoodCount(moods)).toEqual(expected);
});

it('returns correct percentages for count object', () => {
  const moodCounts = {
    happy: 2,
    sad: 2,
    okay: 1,
  };

  const expected = {
    happy: 40,
    sad: 40,
    okay: 20 
  };

  expect(getPercentages(moodCounts, 5)).toEqual(expected);
});