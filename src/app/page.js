import ProductComponent from "../components/producto/productComponent";

export default function Home() {
  return (
<main>
  <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="title">Welcome to the Next.js 13.4 App Router</h1>
        </div>
        <div className="tolumn">
          <h1 className="title">Imagen
          </h1>
        </div>
        <div className="column">
          <h2 className="subtitle">This is a simple example of a Next.js 13.4 app using the App Router.</h2>
          <p className="content">You can use this as a starting point for your own projects.</p>
        </div>
      </div>
    </section>
    <ProductComponent />
  </main>
  );
}
