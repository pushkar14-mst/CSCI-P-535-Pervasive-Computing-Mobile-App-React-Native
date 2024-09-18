import React from "react";
import { Modal, ActivityIndicator, Portal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, message }) => {
  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modalContainer}>
        <View style={styles.content}>
          <ActivityIndicator size="large" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoadingModal;
