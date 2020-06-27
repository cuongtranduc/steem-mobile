import {StyleSheet} from 'react-native';
import {colors} from '../utils/theme';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 5,
  },
});

export default styles;
