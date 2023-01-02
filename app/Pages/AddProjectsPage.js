import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeContainer from '../Containers/HomeContainer'
import { Input } from '../Containers/Input'
import { Button } from '../Components/Button'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'
import uuid from 'react-native-uuid';

export const AddProjectsPage = () => {
    const navigation = useNavigation()
    const { params = {} } = useRoute()
    const { data: paramsData = {} } = params
    const [name, setName] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [students, setStudents] = useState('')
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
      if (paramsData?.id) {
        setName(paramsData.name)
        setSupervisor(paramsData.supervisor)
        setStudents(paramsData?.students?.join(', '))
        setDescription(paramsData?.description)
        setIsEdit(true)
      }
    }, [paramsData])

    const AddProject = async () => {
        const storedData = await AsyncStorage.getItem('projects')
        if (name.trim() === '' || supervisor.trim() === '' || students.trim() === '' || description.trim() === ''){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Kindly fill all fields',
                position: 'bottom'
              });
            return
        }

        if (isEdit) {
            const data = JSON.parse(storedData)
            const Index = data?.findIndex(item => item.id === paramsData?.id)
            if (Index > -1) {
                data[Index] = {
                id: paramsData?.id,
                name,
                supervisor,
                students: students.split(','),
                description: description
                }

            AsyncStorage.setItem('projects', JSON.stringify(data)).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Data updated successfully',
                    position: 'top'
                  });
                navigation.navigate('Projects')
            }) 
            } 
            return
        }

        if (storedData !== null) {
            const data = JSON.parse(storedData)
            data.push({
                id: uuid.v4(),
                name,
                supervisor,
                students: students.split(','),
                description: description
            })
            AsyncStorage.setItem('projects', JSON.stringify(data)).then(() => {
                navigation.navigate('Projects')
            }) 
            return
        }

        const data = [{
            id: uuid.v4(),
            name,
            supervisor,
            students: students.split(','),
            description: description
        }]
        AsyncStorage.setItem('projects', JSON.stringify(data)).then(() => {
            navigation.navigate('Projects')
        })
    }

  return (
    <HomeContainer back heading={isEdit ? 'Edit a project' : 'Add a project'}>
        <View style={{ width: '100%', alignItems: 'center' }}>
        <Image style={styles.logo} source={require("../assets/addProject.png")} />

        <View style={{ width: '100%', marginTop: 20 }}>
            <Input value={name} onChangeText={(val) => setName(val)} placeholder={"Project Name"} />
            <View style={{ marginTop: 10 }}>
                <Input value={supervisor} onChangeText={(val) => setSupervisor(val)} placeholder={"Supervisor"} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Input value={students} onChangeText={(val) => setStudents(val)} placeholder={"Students"} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Input textArea value={description} onChangeText={(val) => setDescription(val)} placeholder={"Description"} />
            </View>
            <View style={{ marginTop: 20 }}>
            <Button
        text={isEdit ? 'EDIT' : 'ADD'} textColor={'#fff'}
        onPress={AddProject}
        />
            </View>
        </View>
        </View>
        </HomeContainer>
  )
}

const styles = {
    logo: {
        width: 100,
        height: 100,
        marginTop:40,
      }
}