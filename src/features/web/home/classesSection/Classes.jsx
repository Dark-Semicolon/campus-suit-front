import Card from "./Card";

function Classes() {
  return (
    <section className="pt-20 space-y-20 bg-mint-green-color-light">
      <header className="text-center">
        <h2 className="text-2xl md:text-3xl text-whtie">
          الصفوف{" "}
          <span className="text-blue-color-light">
            الدراســـــــــــــــــية
          </span>
        </h2>
      </header>
      <div className="container flex flex-wrap items-center justify-center gap-8 mx-auto">
        <Card
          title="الصف الأول الثانوي"
          year="الأول"
          educationalLevel="الثانوي"
          link="/1/courses"
        />
        <Card
          title="الصف الثاني الثانوي"
          year="الثاني"
          educationalLevel="الثانوي"
          link="/2/courses"
        />
        <Card
          title="الصف الثالث الثانوي"
          year="الثالث"
          educationalLevel="الثانوي"
          link="/3/courses"
        />
      </div>
    </section>
  );
}

export default Classes;
