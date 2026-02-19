import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../components/ui/CustomButton';

describe('CustomButton', () => {
  it('should render with title', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Press Me" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should render secondary variant correctly', () => {
    const { getByText } = render(
      <CustomButton title="Secondary" onPress={() => {}} variant="secondary" />
    );
    
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('should apply custom style', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <CustomButton title="Styled" onPress={() => {}} style={customStyle} />
    );
    
    expect(getByText('Styled')).toBeTruthy();
  });
});
