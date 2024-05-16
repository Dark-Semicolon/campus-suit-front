import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';

function AlertWarning() {
    return (
        <div>
            <Alert severity="warning" sx={{
                justifyContent: 'center',

            }}>
                <AlertTitle>warning</AlertTitle>
                This account is inactive. You may be unable to interact on the platform. Please contact support
            </Alert>
        </div>
    )
}

export default AlertWarning