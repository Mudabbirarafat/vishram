import Header from '../components/Header'
import Hero from '../components/Hero'
import Location from '../components/Location'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section id="home">
          <Hero />
        </section>
        <section id="location">
          <Location />
        </section>
        <section id="reviews">
          <Reviews />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="blog">
          <Blog />
        </section>
      </main>
      <Footer />
    </>
  )
}
