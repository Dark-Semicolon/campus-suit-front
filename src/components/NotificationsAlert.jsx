import { Badge, Button } from "@nextui-org/react";
import { Notifications } from "@mui/icons-material";

function NotificationsAlert({ count, variant }) {
  return (
    <Badge content={count} shape="circle" className="p-1 font-semibold text-white bg-blue-color-primary">
      <Button
        radius="full"
        isIconOnly
        aria-label={`you have more than ${count} notifications`}
        variant={variant}
      >
        <Notifications className="text-gray-color-primary" />
      </Button>
    </Badge>
  );
}

export default NotificationsAlert;
