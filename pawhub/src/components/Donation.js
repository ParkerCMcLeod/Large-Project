import React from 'react';
import "./donation.css";
import DonationPicOne from "../images/AnimalServicesHoriz_no_tagline.png"
import DonationPicTwo from "../images/PTL23-Logo-Primary-RGB-Full-Color-1.png"
import DonationPicThree from "../images/headerlogo-400px.png";

function Donation() {
  return (
    <div className='Donation-container'>
    <h1>Donate</h1>
    <div>
    <a href='http://www.orangecountyanimalservicesfl.net/GetInvolved/Donate.aspx'>
        <img src={DonationPicOne} alt="Logo"/>
    </a>
    <a href='https://petallianceorlando.org/ways-give/donate/'>
        <img src={DonationPicTwo} alt="Logo"/>
    </a>
    <a href='https://www.humanesocietyncfl.org/donate/'>
        <img src={DonationPicThree} alt="Logo"/>
    </a>
    
    
    </div>
    
    </div>
  )
}

export default Donation;