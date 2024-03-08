import React, {useRef} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import ConsoleFABModal from './ConsoleModal';

interface CodeEditorWebViewProps {}

const CodeEditorWebView: React.FC<CodeEditorWebViewProps> = () => {
  const webViewRef = useRef<WebView>(null);

  const consoleMessagesRef = useRef<ConsoleMessage[]>([]);

  const updateConsoleMessages = (newMessage: ConsoleMessage) => {
    consoleMessagesRef.current = [...consoleMessagesRef.current, newMessage];
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    const {type, payload} = message;

    switch (type) {
      case 'editorContentChange':
        updateConsoleMessages({
          message: 'Editor content changed:',
          data: payload,
        });
        break;
      // Handle other message types as needed
      default:
        console.error('Received unknown message type:', type);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: 'http://192.168.0.146:3370',
        }}
        style={styles.container}
        onMessage={onMessage}
        startInLoadingState={false}
        onError={event => {
          // TODO: Improve error handling and display.
          Alert.alert('WebView Error', JSON.stringify(Object.keys(event)));
        }}
        onLoad={() => {
          // TODO: Setup debug logging.
          console.log('WebView Loaded');
        }}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      />
      <ConsoleFABModal getConsoleMessages={() => consoleMessagesRef.current} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodeEditorWebView;
