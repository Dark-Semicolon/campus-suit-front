import { useParams } from "react-router-dom";
import style from "./ErrorPage.module.css";
import Button from "../Button";

function ErrorPage({ error, status, resetErrorBoundary }) {
  // const navigate = useNavigate();
  const { statusCode } = useParams();

  const errors = {
    404: "غير موجود",
    401: "لا تملك صلاحية الوصول",
    403: "ليس لديك إذن للوصول إلى هذا المورد",
    402: "خطأ في الخادم",
  };

  return (
    <section className="h-screen bg-white">
      <div className="flex flex-col items-center justify-center h-screen px-10">
        <h1 className="font-medium text-center text-7xl">
          {statusCode || status}
        </h1>
        <div className={style.bgImg}></div>
        <div className="flex flex-col items-center justify-center gap-7">
          {resetErrorBoundary ? (
            <>
              <h2 className="text-2xl font-normal text-blue-color-primary">
                {error.message}
              </h2>
              <p className="text-lg font-medium text-center text-blue-color-primary">
                نأسف، حدث خطأ في التطبيق <br />
                الرجاء إعادة تحميل الصفحة و في حالة استمرار الخطأ الرجاء التواصل
                مع خدمة العملاء
              </p>
              <Button
                onClick={resetErrorBoundary}
                type="primary"
                className="leading-7 w-fit"
              >
                إعادة التشغيل
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-4xl font-normal text-blue-color-primary">
                {error || errors[statusCode]}
              </h3>
              <p className="text-lg font-medium text-blue-color-primary">
                هل أنت متأكد أنك تريد أن تكون هنا؟
              </p>
              <Button to="/" type="primary" className="leading-7 w-fit">
                الرجوع للصفحة الرئيسية
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
