import { TextInput } from 'react-native'
import React from 'react'

export const Input = ({ placeholder, ...props }) => {
  return (
    <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...props}
      />
  )
}


const styles = {
    input: {
      width: '100%',
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
    }
    }