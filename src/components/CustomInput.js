import {StyleSheet, TextInput, Image, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';

const CustomInput = ({
  flag,
  onChangeText,
  placeholder,
  keyboardType,
  max,
  value,
  placeholderTextColor,
  customStyle,
  customInput,
  editable,
  secureTextEntry,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      borderWidth: 1,
      borderColor: theme.black,
      borderRadius: 15,
      paddingHorizontal: 15,
      marginVertical: responsiveSize(8),
    },
    input: {
      width: '95%',
      paddingVertical: 0,
      height: responsiveSize(45),
      color: theme.black,
      fontSize: responsiveSize(12),
    },
  });
  return (
    <View style={[styles.container, customStyle]}>
      <TextInput
        style={[styles.input, customInput]}
        placeholder={placeholder}
        placeholderTextColor={theme.black}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={max}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;
