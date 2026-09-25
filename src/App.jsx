function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            Shopy
          </a>

          <nav className="nav">
            <a href="/">Home</a>
            <a href="/cart">Cart</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero container">
          <p className="eyebrow">Welcome to Shopy</p>
          <h1>Simple shopping, made better.</h1>
          <p className="hero-text">
            A modern mini e-commerce experience built with React.
          </p>

          <button className="primary-button" type="button">
            Explore Products
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Shopy. Built with React.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
