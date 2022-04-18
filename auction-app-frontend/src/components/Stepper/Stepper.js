import CircleContainedIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import 'assets/style/stepper.scss';

const Stepper = ({ step }) => {
    return (
        <div className='stepper-container'>
            <CircleContainedIcon color='primary' />
            <div className={step >= 1 ? 'connector-line-completed' : 'connector-line'} />
            {step >= 1 ?
                <CircleContainedIcon color='primary' /> :
                <CircleOutlinedIcon color='primary' />
            }
            <div className={step >= 2 ? 'connector-line-completed' : 'connector-line'} />
            {step >= 2 ?
                <CircleContainedIcon color='primary' /> :
                <CircleOutlinedIcon color='primary' />
            }
        </div>
    );
};

export default Stepper;