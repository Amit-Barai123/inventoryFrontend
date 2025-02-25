
import React from "react";
import Footer from "../Component/SharedComponent/Footer";
import '../styles/HomePage.css'
const ContactPage = () => {
  return (
    <>
      <section className="banner_section">
        <div className="container">
          <div className="banner-content">
            <h1>Contact Us</h1>
          </div>
        </div>
      </section>

      <section className="contact_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center pb-5">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                The Passage Experienced A Surge In Popularity During The 1960s
                When Again During The 90s As Desktop Publishers
              </p>
            </div>
            <div className="col-12 contact-form">
              <div className="row">
                <div className="col-lg-7 mb-5">
                  <form className="row g-3">
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name *"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email *"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Address *"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Your Phone *"
                        required=""
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <input
                        className="form-control"
                        placeholder="Your Message"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn main-btn">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5 mb-5">
                  <div className="content-box ms-sm-5">
                    <ul className="info-box clearfix">
                      <li>
                        <i className="bi bi-phone"></i>
                        <p>Any Questions? Call us</p>
                        <div>
                          <a href="#">+91 123 123 1234</a>
                        </div>
                      </li>
                      <li>
                        <i className="bi bi-envelope-open"></i>
                        <p>Any Questions? Email us</p>
                        <div>
                          <a href="#">info@example.com</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Map Section */}
            <div className="col-12">
              <h3 className="text-center mb-3">Our Location</h3>
              <div className="google-map">
                <iframe
                  title="Hyderabad Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800986.0864908713!2d77.1206672415346!3d17.384051747887624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c3c2a5b7c1%3A0xdbc7b0d1e53a5d!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1699385014948!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default ContactPage;
