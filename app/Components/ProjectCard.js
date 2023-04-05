import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Heading, Stack, Text } from 'native-base'
import { primaryColor, primaryGreenColor, primaryRedColor } from '../Utilities/Colors'
import { Button } from './Button'

export const ProjectCard = ({ onPress, heading, supervisor, students = [], description, onUpdate, onDelete }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, borderRadius: 8, padding: 12, borderColor: 'gainsboro' }}>
            <Stack space={2}>
                <Heading size="md" ml="-1">
                   {heading}
                </Heading>
                <Text fontSize="xs" _light={{
                    color: primaryColor
                }} fontWeight="500" ml="-0.5" mt="-1">
                    {supervisor}
                </Text>
                <Text fontWeight="700">
                    {students?.join(', ')}
                </Text>
                <Text fontWeight="400">
                    {description}
                </Text>

            </Stack>
        </TouchableOpacity>
    )
}