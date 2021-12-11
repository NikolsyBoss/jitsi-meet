import React from 'react';
import {StyleSheet, ImageBackground} from "react-native";

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
});

const BaseEfcoBg = ({children}) => {
    return (
        <ImageBackground
            source={require('./bg-chat.jpg')}
            resizeMode="cover"
            style={styles.imgBackground}>

            { children }

        </ImageBackground>
    );
};

export default BaseEfcoBg;