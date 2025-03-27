import Layout from "@/layouts/HomePageLayout"
import Header from "./landing/Header"
import Tracking from "./landing/Tracking"
import Schedule from "./landing/Schedule"
import CarouselPage from "./landing/ScheduleCarousel"
import FAQ from "./landing/FAQ"

const Home = () => {
  return (
    
    <Layout>
        <Header/>
        <Tracking/>
        <Schedule/>
        <CarouselPage/>
        <FAQ/>
    </Layout>
  )
}

export default Home