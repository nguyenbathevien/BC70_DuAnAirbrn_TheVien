import Content from "./component/Content";
import FooterComponent from "./component/FooterComponent";
import Header from "./component/Header";

export default function HomePage() {
  return (
    <main>
      <Header/>
      <Content/>
      <FooterComponent/>
    </main>
  );
}