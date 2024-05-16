import { useLocation } from 'react-router-dom';
import Button from './Button';

function ClearParamsButton() {
    const { pathname } = useLocation()

    return (
        <Button type='primary' to={pathname} className='rounded-lg'>
            Cancel
        </Button>
    )
}

export default ClearParamsButton