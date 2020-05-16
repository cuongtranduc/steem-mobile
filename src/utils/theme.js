import {Dimensions, Platform, StatusBar} from 'react-native';

export const colors = {
  primary: '#2095F2',
  secondary: '#14171A',
  dark_gray: '#657786',
  light_gray: '#AAB8C2',
  exlight_gray: '#E1E8ED',
  exexlight_gray: '#F5F8FA',
  white: '#FFF',
  black: '#000',
};

export default {
  // Primary Colors
  $theme: 'lightTheme',
  $primaryBackgroundColor: '#FFFFFF',
  $primaryLightBackground: '#f6f6f6',
  $primaryGrayBackground: '#f5f5f5',
  $primaryWhiteLightBackground: '#ffffff',
  $white: '#FFFFFF',
  $black: '#000000',
  $primaryBlue: '#357ce6',
  $primaryDarkBlue: '#1a509a',
  $primaryLightBlue: '#eaf2fc',
  $primaryGray: '#f5f5f5',
  $primaryDarkGray: '#788187',
  $primaryLightGray: '#f6f6f6',
  $primaryRed: '#e63535',
  $companyRed: '#c10000',
  $primaryBlack: '#3c4449',
  $primaryDarkText: '#788187',

  // General Colors
  $borderColor: '#c5c5c5',
  $tagColor: '#c1c5c7',
  $bubblesBlue: '#5CCDFF',
  $iconColor: '#c1c5c7',
  $darkIconColor: '#c1c5c7',
  $borderTopColor: '#cfcfcf',
  $dangerColor: '#fff',
  $warningColor: '#fff',
  $successColor: '#fff',
  $disableButton: '#fff',
  $shadowColor: '#b0b0b0',
  $disableGray: '#fff',
  $editorButtonColor: '#3c4449',
  $pureWhite: '#ffffff',
  $notificationBorder: '#fff',
  $tableTrColor: '#f5f5f5',
  $tableBorderColor: '#FFFFFF',
  $noConnectionColor: '#788187',

  // Devices Sizes
  $deviceHeight:
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : Dimensions.get('window').height + StatusBar.currentHeight,
  $deviceWidth: Dimensions.get('window').width,

  // Fonts Properties
  $primaryFont: 'Roboto',
  $editorFont: 'RobotoMono-Regular',
  $primaryLatterSpacing: 0,
};
