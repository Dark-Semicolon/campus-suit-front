import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';

function AlertWarning() {
    return (
        <div>
            <Alert severity="warning" sx={{
                justifyContent: 'center',

            }}>
                <AlertTitle>تحذير</AlertTitle>
                هذا الحساب غير مفعل قد تكون غير قادر علي التفاعل علي المنصة بالرجاء التواصل مع الدعم
            </Alert>
        </div>
    )
}

export default AlertWarning