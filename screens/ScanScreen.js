import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'; 

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
          hasCameraPermissions: null,
          scanned: false,
            scannedData:'',
          buttonState: 'normal',
         
        }
      }
    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status=="granted",
            buttonState:'clicked',
            scanned:false
        })
        
    }
    handleBarCodeScanner=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState=="clicked"&&hasCameraPermissions){
           // alert("executed")
            return(       
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                style={StyleSheet.absoluteFillObject}
              />
             
            )
          }
       else if(buttonState=="normal"){
          return(
              <View>
                  <Image 
                  source={require("../assets/scanner.png")}
                  style={{width:200,height:200, alignSelf:"center"}}
                  />
          <TouchableOpacity onPress={this.getCameraPermissions} title="Bar Code Scanner">
              <Text>Scan Bar Code</Text>
          </TouchableOpacity>
          </View>
          )
        }
       
}
}