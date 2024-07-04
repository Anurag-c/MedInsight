import { Banner } from "../../components/landing/Banner";
import { ProductGoal } from "../../components/landing/ProductGoal";
import { Services } from "../../components/landing/Services";
import { Testimonials } from "../../components/landing/Testimonials";
import { ContactUs } from "../../components/landing/ContactUs";
import { Footer } from "../../components/Footer";
import {Header} from "../../components/Header"

function LandingPage () {
    return (
        <div>       
            <Banner />
            <ProductGoal />
            <Services />
            <Testimonials />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default LandingPage;