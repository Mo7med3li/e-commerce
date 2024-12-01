import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  return (
    <>
      <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <Card />
      </div>
    </>
  );
}
