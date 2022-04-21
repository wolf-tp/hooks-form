import { View, Text, TextInput as TextInputRN } from 'react-native';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';

type Props = TextInputProps & {
  errorMessage?: string;
  label?: string;
};

export const TextInput = ({ label, errorMessage, ...inputProps }: Props) => {
  return (
    <View>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInputRN style={styles.textInputStyle} {...inputProps} />
      {!errorMessage || <Text style={styles.errorStyle}>{errorMessage}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
    color: '#333',
    paddingBottom: 10,
  },
  errorStyle: {
    fontSize: 14,
    color: '#f00',
    marginBottom: 10,
  },
  textInputStyle: { borderWidth: 1, padding: 10 },
});
