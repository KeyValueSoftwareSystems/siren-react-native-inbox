import React from 'react';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';
import NetworkLogger from 'react-native-network-logger';

const NetworkLogDebugModal = ({onPress}: {onPress?: () => void}) => {
  const [isNetworkModalVisible, setIsNetworkVIsible] = useState(false);

  return (
    <>
      <Modal
        style={styles.modal}
        isVisible={isNetworkModalVisible}
        onBackButtonPress={() => setIsNetworkVIsible(false)}
        backdropTransitionOutTiming={0}>
        <SafeAreaView style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsNetworkVIsible(false)}>
            <Text style={styles.closeButtonTitle}>{'CLOSE'}</Text>
          </TouchableOpacity>
          <NetworkLogger />
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          onPress && onPress();
          setIsNetworkVIsible(true);
        }}>
        <Text style={styles.content}>{'Network Logs'}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: '#FFF',
  },
  container: {
    width: 45,
    height: 45,
    position: 'absolute',
    left: 20,
    bottom: 50,
    borderRadius: 45,
    backgroundColor: '#EB5017',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 8,
    fontWeight: '800',
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButtonTitle: {
    textAlign: 'center',
  },
});

export default React.memo(NetworkLogDebugModal);