import { FlatList, View } from 'react-native'
import React, { useCallback } from 'react'
import { VStack, Box, Divider, NativeBaseProvider, Heading, Text, Stack } from 'native-base';
import HomeContainer from '../Containers/HomeContainer';
import { ProjectCard } from '../Components/ProjectCard';

const data = [
    {
        name: 'FYP Management System',
        supervisor: 'Ameen Khowaja',
        students: ['Ali Murtaza', 'Fazla Usman', 'Syed Abdul Moiz'],
        description: 'Small FYP management app that will let Supervisors track there students FYP progress.'
    },
    {
        name: 'Chat GPT',
        supervisor: 'Qurban Lakhan',
        students: ['Ali Raza', 'Usama Mirza', 'Jahanzeb Ali'],
        description: 'Search engine powered by openAI that will provide accurate data than google, bing, edge etc.'
    },
    {
        name: 'Healthcare Management System',
        supervisor: 'Qurban Lakhan',
        students: ['Aisha Baig', 'Asad Khan', 'Mansoor Ahmed'],
        description: 'Search engine powered by openAI that will provide accurate data than google, bing, edge etc.'
    }
]

const renderItem = ({ item }) => (
    <View style={{ marginTop: 10 }}>
        <ProjectCard
            heading={item?.name}
            supervisor={item?.supervisor}
            students={item?.students}
            description={item?.description}
        />
    </View>
)

const ProjectsPage = () => {
    return (
        <HomeContainer heading={'Projects'}>
            <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                <View style={{ width: '100%', flex: 1 }}>
                    <FlatList
                        key={(item, i) => `${i}`}
                        data={data}
                        renderItem={renderItem}
                        style={{ flex: 1, width: '100%', }}
                    />
                </View>
            </View>
        </HomeContainer>
    )
}

export default ProjectsPage