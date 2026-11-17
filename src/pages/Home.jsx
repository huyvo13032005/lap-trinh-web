import '../styles/home.css'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>Chào mừng đến với MyWebsite</h1>
        <p>Mô tả ngắn về đề tài cuối môn của bạn.</p>
        <button className="btn-primary">Khám phá ngay</button>
      </section>

      <section className="features">
        <h2>Tính năng nổi bật</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>Tính năng 1</h3>
            <p>Mô tả tính năng 1.</p>
          </div>
          <div className="feature-card">
            <h3>Tính năng 2</h3>
            <p>Mô tả tính năng 2.</p>
          </div>
          <div className="feature-card">
            <h3>Tính năng 3</h3>
            <p>Mô tả tính năng 3.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
