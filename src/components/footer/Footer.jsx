import React from 'react'
import { FaImage} from "react-icons/fa";
import "./Footer.css";

export default function Footer(props) {

  return (
<> 

 
  <div id="footer" className=' footer_con '>
    <div className='row footer-row'>
      <div class="col-12 col-md-6 col-lg-3">
        <div className='d-flex flex-column justify-content-center align-items-start footer-company-info'>
          <div className='footer-company-info-item'><FaImage size={33} /><span className='footer-logo-text mx-3'>PhotoExtract</span></div>
          <div className='footer-company-info-item'>PhotoExtract</div>
          <div className='footer-company-info-item'>707 Bay Ave</div>
          <div className='footer-company-info-item'>Kemah, TX 77565</div>
          <div className='footer-company-info-item'>Speak with sales: (832) 727-5251</div>
          <div className='d-flex flex-row mt-3'>
            
                
          </div>
          <div className='footer-status-con'>
            <div>Status: All Systems Operational</div>
          </div>
        </div>
      </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div className='d-flex flex-column footer-link-col'>
            <div className='footer-link-header'>Product</div>
            <div className='d-flex flex-column'>
              <div className='footer-link-col-item'>Pricing</div>
              <div className='footer-link-col-item'>Customers</div>
              <div className='footer-link-col-item'>Docs</div>
              <div className='footer-link-col-item'>Blog</div>
              <div className='footer-link-col-item'>Request a Demo</div>
              <div className='footer-link-col-item'>Contact Us</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
        <div className='d-flex flex-column footer-link-col'>
            <div className='footer-link-header'>Company</div>
            <div className='d-flex flex-column'>
              <div className='footer-link-col-item'>About</div>
              <div className='footer-link-col-item'>Careers</div>
              <div className='footer-link-col-item'>Privacy</div>
              <div className='footer-link-col-item'>Terms and Conditions</div>
              <div className='footer-link-col-item'>Acceptable Use</div>
              <div className='footer-link-col-item'>Open Source</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3"><div className='d-flex flex-column footer-link-col'>
            <div className='footer-link-header'>Support</div>
            <div className='d-flex flex-column'>
              <div className='footer-link-col-item'>Chat</div>
              <div className='footer-link-col-item'>Email</div>
              <div className='footer-link-col-item'>Sign up</div>
              <div className='footer-link-col-item'>Login</div>
            </div>
          </div></div>
        
        

    </div>
   
    <div className='row py-3'>
      <div className='footer-cpy d-flex justify-content-center align-items-center'>
         <div>Copyright ©2023 Satellite. All rights reserved.</div>
      </div>
    </div>
  </div>
  
 
</>
)

}
