import { View } from 'react-native'
import React from 'react'
import { Heading, Stack, Text } from 'native-base'
import { primaryColor, primaryGreenColor, primaryRedColor } from '../Utilities/Colors'
import { Button } from './Button'

export const ProjectCard = ({ heading, supervisor, students = [], description, onUpdate, onDelete }) => {
    return (
        <View style={{ borderWidth: 1, borderRadius: 8, padding: 12, borderColor: 'gainsboro' }}>
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

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                <Button
        text={'UPDATE'} bgColor={primaryGreenColor} textColor={'#fff'}
        buttonStyles={{ width: '45%' }}
        onPress={onUpdate}
        />
                <Button
        text={'DELETE'} bgColor={primaryRedColor} textColor={'#fff'}
        buttonStyles={{ width: '45%' }}
        onPress={onDelete}
        />
                </View>

            </Stack>
        </View>
    )
}