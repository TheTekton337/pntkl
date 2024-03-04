import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

interface CodeEditorWebViewProps {}

const CodeEditorWebView: React.FC<CodeEditorWebViewProps> = () => {
  const webViewRef = useRef<WebView>(null);

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    // Handle incoming messages from the webview
    if (data.type === 'EDITOR_EVENT') {
      // Handle events from the code editor
      console.log('Received editor event:', data.payload);
    }
  };

  // Define the JavaScript code to inject into the webview for communication
  const injectedJavaScript = `
    // Set up a listener for events in the code editor
    window.addEventListener('YOUR_EDITOR_EVENT', function(event) {
      // Send the event data to React Native
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'EDITOR_EVENT', payload: event.detail }));
    });

    // Expose a function to be called by React Native
    window.setEditorContent = function(content) {
      // Set the content in the code editor
      // Example: editor.setValue(content);
    };

    // Other initialization or communication logic...
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: 'http://localhost:3370'}}
        style={{flex: 1}}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodeEditorWebView;
