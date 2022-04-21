import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useForm } from '@wolf-tp/hooks-form';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { validateEmailOptional } from './utils/validate';
import { TextInput } from './components/TextInput';

type User = { username: string; password: string };
export default function App() {
  const { register } = useForm<User>({
    username: [[validateEmailOptional]],
    password: [],
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        label="Username"
        {...register('username')}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        label="Username"
        {...register('password')}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#41bf6b',
          padding: 10,
          marginVertical: 20,
          alignSelf: 'center',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
