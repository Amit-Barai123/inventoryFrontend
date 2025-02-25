import React from 'react'

const Footer = () => {
  return (
    <footer id="footer">
    <div class="footer py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <a class="footer-link" href="#">Register</a>
            <a class="footer-link" href="#">Forum</a>
            <a class="footer-link" href="#">Affiliate</a>
            <a class="footer-link" href="#">FAQ</a>
            <div class="footer-social pt-4 text-center">
              <a href="#"><i class="bi bi-facebook"></i></a>
              <a href="#"><i class="bi bi-twitter"></i></a>
              <a href="#"><i class="bi bi-youtube"></i></a>
              <a href="#"><i class="bi bi-linkedin"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
              <a href="#"><i class="bi bi-envelope-open-fill"></i></a>
              <a href="#"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="footer-copy">
              <div class="copy-right text-center pt-5">
                <p class="text-light">© 2025. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer