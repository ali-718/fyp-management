import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { primaryColor } from './Utilities/Colors';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('home')}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === 'home' ? primaryColor : '#555'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('search')}
      >
        <MaterialIcons
          name='notifications'
          size={24}
          color={activeTab === 'search' ? primaryColor : '#555'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('profile')}
      >
        <MaterialIcons
          name="person"
          size={24}
          color={activeTab === 'profile' ? primaryColor : '#555'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
