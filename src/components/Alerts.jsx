import Alert from "@mui/material/Alert";

export default function Alerts({ variant, severity, message }) {
  return (
    <Alert
      variant={variant}
      severity={severity}
      sx={{ width: "100%", padding: 2, fontSize: 18, marginTop: 3 }}
    >
      {message}
    </Alert>
  );
}
