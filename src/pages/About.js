import React from 'react'
import Footer from '../Component/SharedComponent/Footer'
import '../styles/HomePage.css'
const About = () => {
  return (
    <>
      <section class="banner_section">
        <div class="container">
            <div class="banner-content">
                <h1>About Us</h1>
            </div>
        </div>
    </section>
 
    <section class="about_section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 text-center pb-5">
                    <h2 class="section-title">About Us</h2>
                    <p class="section-subtitle">Etiam efficitur purus ligula, vitae convallis magna tincidunt vitae. Integer ut lacus vitae.</p>
                </div>
            </div>
            <div class="row align-items-center py-5">
                <div class="col-lg-6 col-12 mb-4">
                    <div class="me-lg-5">
                        <img decoding="async" src="./images/about/about-img.jpg" alt="about" class="img-fluid"/>
                        
                    </div>
                </div>
                <div class="col-lg-6 col-12 mb-4">
                    <div class="about-content">
                        <div class="about-details">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit neque, mollis eu porttitor nec, interdum at lorem. Nunc leo felis, sagittis vel nisi non, ultricies accumsan massa. Proin ac augue aliquam, imperdiet libero et, sollicitudin nunc. Ut condimentum ornare tellus, sed viverra lectus porta id. Pellentesque vel viverra augue. Pellentesque sapien purus, aliquam et mauris in, euismod commodo nunc. In eget elit vitae ex rhoncus blandit a sed mauris. Maecenas cursus dignissim arcu rhoncus consequat. Etiam id sagittis elit, id faucibus est. Praesent vel urna vitae ante luctus volutpat ut ut augue. Etiam efficitur purus ligula, vitae convallis magna tincidunt vitae. Integer ut lacus vitae ligula pellentesque rhoncus a sit amet risus. In hac habitasse platea dictumst.</p>
                            

                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-center py-5">
                <div class="col-lg-6 col-12 order-2 order-lg-1 mb-4 ">
                    <div class="about-content">
                        <div class="about-details">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit neque, mollis eu porttitor nec, interdum at lorem. Nunc leo felis, sagittis vel nisi non, ultricies accumsan massa. Proin ac augue aliquam, imperdiet libero et, sollicitudin nunc. Ut condimentum ornare tellus, sed viverra lectus porta id. Pellentesque vel viverra augue. Pellentesque sapien purus, aliquam et mauris in, euismod commodo nunc. In eget elit vitae ex rhoncus blandit a sed mauris. Maecenas cursus dignissim arcu rhoncus consequat. Etiam id sagittis elit, id faucibus est. Praesent vel urna vitae ante luctus volutpat ut ut augue. Etiam efficitur purus ligula, vitae convallis magna tincidunt vitae. Integer ut lacus vitae ligula pellentesque rhoncus a sit amet risus. In hac habitasse platea dictumst.</p>
                          

                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-12 order-1 order-lg-2 mb-4">
                    <div class="me-lg-5">
                    <img decoding="async" src="./images/about/about-img.jpg" alt="about" class="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    </>
  )
}

export default About