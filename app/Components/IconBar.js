import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { primaryRedColor } from '../Utilities/Colors'

export const IconBar = ({iconName, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center'}}>
       <MaterialIcons
          name={iconName}
          size={24}
          color={primaryRedColor}
        />

        <Text style={{color: primaryRedColor, marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>{text}</Text>
    </TouchableOpacity>
  )
}