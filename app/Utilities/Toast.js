import Toast from 'react-native-toast-message';

export const ToastSuccess = (Message, position) => {
    Toast.show({
      type: "success",
      text1: 'Success',
      text2: Message,
      visibilityTime: 4000,
      autoHide: true,
      position: position || 'top',
    });
  };
  
  export const ToastError = (Message, position) => {
    Toast.show({
      type: "error",
      text1: 'Error',
      text2: Message,
      visibilityTime: 4000,
      autoHide: true,
      position: position || 'top',
    });
  };