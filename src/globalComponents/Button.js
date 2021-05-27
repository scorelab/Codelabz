import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CodelabZButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    background: '#455A64',
    borderColor: '#455A64',
    width: '100%',
    height: '32px',
    padding: '4px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    textTransform: 'none',
    fontWeight: '400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      color: '#fff',
      background: '#5f6b70',
      borderColor: '#5f6b70',
    },
  },
}))(Button);

export default CodelabZButton;
