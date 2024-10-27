import Content from "./component/Content";
import FooterComponent from "./component/FooterComponent";
import HomePage from "./component/HomePage";

export default function Home() {
  return (
    <main>
      <HomePage/>
      <Content/>
      <FooterComponent/>
    </main>
  );
}