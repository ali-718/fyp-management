import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Heading, Stack, Text } from 'native-base'
import { primaryColor, primaryGreenColor, primaryRedColor } from '../Utilities/Colors'
import { Button } from './Button'

export const ProjectCard = ({ onPress, heading, supervisor = "", students = [], description }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, borderRadius: 8, padding: 12, borderColor: 'gainsboro' }}>
            <Stack space={2}>
                {heading && <Heading size="md" ml="-1">
                   {heading}
                </Heading>}
                {supervisor && <Text fontSize="xs" _light={{
                    color: primaryColor
                }} fontWeight="500" ml="-0.5" mt="-1">
                    {supervisor}
                </Text>}
                {students?.length > 0 && <Text fontWeight="700">
                    {students.map(item => item.name)?.join(', ')}
                </Text>}
                {description && <Text fontWeight="400">
                    {description}
                </Text>}
            </Stack>
        </TouchableOpacity>
    )
}