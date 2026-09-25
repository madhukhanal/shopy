function Home() {
  return (
    <section className="hero container">
      <p className="eyebrow">Welcome to Shopy</p>
      <h1>Simple shopping, made better.</h1>
      <p className="hero-text">
        Discover useful products through a clean and simple shopping experience.
      </p>
      <a className="primary-button" href="#products">Explore Products</a>

      <div className="section-placeholder" id="products">
        <p>Products are coming next.</p>
      </div>
    </section>
  )
}

export default Home
