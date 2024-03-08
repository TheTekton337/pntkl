import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, ScrollView} from 'react-native';
import {FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ConsoleMessage {
  message: string;
  data?: any;
}

interface ConsoleModalProps {
  getConsoleMessages: () => ConsoleMessage[];
}

const ConsoleFABModal: React.FC<ConsoleModalProps> = ({getConsoleMessages}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [messages, setMessages] = useState<ConsoleMessage[]>([]);

  const fetchMessages = () => {
    setMessages(getConsoleMessages());
  };

  if (!isModalVisible) {
    return (
      <FAB
        style={styles.fab}
        size="small"
        icon="plus"
        onPress={() => {
          fetchMessages();
          setIsModalVisible(true);
        }}
      />
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <Text style={{color: 'white'}}>Console Log</Text>
          <ScrollView contentContainerStyle={styles.container}>
            {messages.map((log, index) => (
              <View key={index} style={styles.logEntry}>
                <Text style={styles.logText}>{log.message}</Text>
                {log.data && (
                  <Text style={styles.logData}>
                    {JSON.stringify(log.data, null, 2)}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
          <FAB
            style={styles.closeButton}
            size="small"
            icon="close"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 16,
  },
  fab: {
    backgroundColor: '#6200ee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  logText: {
    color: 'white',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
  },
  logEntry: {
    color: 'white',
    marginBottom: 15,
  },
  logData: {
    color: 'white',
  },
  // Other styles...
});

export default ConsoleFABModal;
