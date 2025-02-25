import React from 'react'
import '../styles/HomePage.css'
import HeroAnimation from '../Component/HomeComponent/HeroAnimation'
import MultiTasking from '../Component/HomeComponent/MultiTaskingAnimation'
import Footer from '../Component/SharedComponent/Footer'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
       <section id="home">
    <div class="container-fluid px-0 top-banner">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-6">
            <h1>Best Choice For kitchen Inventory Managemenent</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum amet leo.
            </p>
            <div class="mt-4">
              <Link to="/login"><button class="main-btn">Login <i class="fas fa-shopping-basket ps-3"></i></button></Link>
              <Link to='/signup'><button class="white-btn ms-lg-4 mt-lg-0 mt-4">SignUp<i class="fas fa-angle-right ps-3"></i></button></Link>
            </div>
          </div>
          <div class="col-lg-5 col-md-6">
            <HeroAnimation/>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <!-- section-3 about--> */}
   <section id="about">
     <div class="about-section wrapper">
       <div class="container">
         <div class="row align-items-center">
           <div class="col-lg-7 col-md-12 mb-lg-0 mb-5">
             <div class="card border-0">
               <img decoding="async" src="images/img/img-1.png" class="img-fluid"/>
             </div>
           </div>
           <div class="col-lg-5 col-md-12 text-sec">
            <h2>Track all the Items with inBuild store and Super Dashboard feature.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
              amet leo. Mauris feugiat erat tellus.</p>
              <button class="main-btn mt-4">Learn More</button>
           </div>
         </div>
       </div>
       <div class="container food-type">
         <div class="row align-items-center">
           <div class="col-lg-5 col-md-12 text-sec mb-lg-0 mb-5">
            <h2>Save Time Money And Efforts at Same Time.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
              amet leo. Mauris feugiat erat tellus.Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.</p>
            <ul class="list-unstyled py-3">
              <li>Etiam sed dolor ac diam volutpat.</li>
              <li>Erat volutpat aliquet imperdiet.</li>
              <li>purus a odio finibus bibendum.</li>
            </ul> 
            <button class="main-btn mt-4">Learn More</button>
           </div>
           <div class="col-lg-7 col-md-12">
             <div class="card border-0">
               <MultiTasking/>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>

  {/* <!-- section-3 story--> */}
   <section id="story">
     <div class="story-section">
       <div class="container">
         <div class="row">
           <div class="col-sm-12">
             <div class="text-content">
              <h2> far from the countries Vokalia and Consonantia, there live the
              blind texts. Separated they live in </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio
                finibus bibendum in sit amet leo. Mauris feugiat erat tellus.</p>
                <button class="main-btn mt-3">Read More</button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>

  {/* <!-- section-4 explore food--> */}
   <section id="explore-food">
     <div class="explore-food wrapper">
       <div class="container">
         <div class="row">
           <div class="col-sm-12">
             <div class="text-content text-center">
              <h2>Our Feature</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
                amet leo. Mauris feugiat erat tellus. Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
             </div>
           </div>
         </div>
         <div class="row pt-5">
           <div class="col-lg-4 col-md-6 mb-lg-0 mb-5 ">
             <div class="card">
               <img decoding="async"  src="images/img/img-3.jpg" style={{height:"200px"}} className="img-fluid"/>
               <div className="pt-3">
                <h4>Manage Recipe</h4>
                <button class="mt-4 main-btn">Read More</button>
              </div>
             </div>
           </div>
           <div class="col-lg-4 col-md-6 mb-lg-0 mb-5">
            <div class="card">
              <img decoding="async" style={{height:"200px"}} src="images/img/img-4.jpg" class="img-fluid "/>
              <div class="pt-3">
                <h4>Manage Inventory</h4>
                <button class="mt-4 main-btn">Read More</button>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-lg-0 mb-5">
            <div class="card">
              <img decoding="async" style={{height:"200px"}} src="images/img/img-5.jpg" class="img-fluid"/>
              <div class="pt-3">
                <h4>Manage Food Wastage</h4>
              
                <button class="mt-4 main-btn">Read More</button>
              </div>
            </div>
          </div>
         </div>
       </div>
     </div>
   </section>

  {/* <!-- Section-5 testimonial--> */}
   <section id="testimonial">
     <div class="wrapper testimonial-section">
       <div class="container text-center">
         <div class="text-center pb-4">
           <h2>Testimonial</h2>
         </div>
         <div class="row">
          <div class="col-sm-12 col-lg-10 offset-lg-1">
            <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                  aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="carousel-caption">
                    <img decoding="async" src="images/review/review-1.jpg"/>
                    <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                      live the blind texts. "</p>
                    <h5>Johnthan Doe - UX Designer</h5>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="carousel-caption">
                    <img decoding="async" src="images/review/review-2.jpg"/>
                    <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                      live the blind texts. "</p>
                    <h5>Maccy Doe - Front End</h5>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="carousel-caption">
                    <img decoding="async" src="images/review/review-1.jpg"/>
                    <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                      live the blind texts. "</p>
                    <h5>Johnthan Doe - UX Designer</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
     </div>
   </section>

  {/* <!-- section-6 faq--> */}
   <section id="faq">
     <div class="faq wrapper">
       <div class="container">
         <div class="row">
           <div class="col-sm-12">
             <div class="text-center pb-4">
              <h2>Frequently Asked Questions</h2>
             </div>
           </div>
         </div>
         <div class="row pt-5">
           <div class="col-sm-6 mb-4">
            <h4><span>~</span> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mass  </h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
              blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </p>
           </div>
           <div class="col-sm-6 mb-4">
            <h4><span>~</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mass</h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
              blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </p>
           </div>
           <div class="col-sm-6 mb-4">
            <h4><span>~</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mass</h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
              blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </p>
           </div>
           <div class="col-sm-6 mb-4">
            <h4><span>~</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mass</h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
              blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </p>
           </div>
         </div>
       </div>
     </div>
   </section>

  {/* <!-- section-8 newslettar--> */}
   <section id="newslettar">
     <div class="newslettar wrapper">
       <div class="container">
         <div class="row">
           <div class="sol-sm-12">
             <div class="text-content text-center pb-4">
              <h2>Hurry up! Subscribe our newsletter
                and get 25% Off</h2>
              <p>Limited time offer for this month. No credit card required. </p>
             </div>
             <form class="newsletter">
               <div class="row">
                 <div class="col-md-8 col-12">
                   <input class="form-control" placeholder="Email Address here" name="email" type="email"/>
                 </div>
                 <div class="col-md-4 col-12">
                   <button class="main-btn" type="submit">Subscribe</button>
                 </div>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </section>

  {/* <!-- section-9 footer--> */}
   <Footer/>
    </div>
  )
}

export default HomePage