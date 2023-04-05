import NarrowByLocationPage from "./NarrowByLocationPage";

const SERVER_URL = "http://localhost:8080";

export default function Main() {
  return (
    <main>
      <h1>Find Your Food</h1>
      <NarrowByLocationPage SERVER_URL={SERVER_URL} />
    </main>
  );
}
