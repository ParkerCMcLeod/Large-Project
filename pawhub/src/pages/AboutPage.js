import React from "react";
import Navigation from "../components/Navigation";
import "./Pages.css";
import text from "./paragraph.txt";

function AboutPage() {
    return (
        <div>
           <Navigation/>
            <div className = "TitleHolder">
                <h1>About Us</h1>
            </div>
        <div className = "Pics"> 

                <ul>
                    <li> <img className = "leftPic" src ="https://bestfriends.org/sites/default/files/2023-02/Victory3427MW_Social.jpg">
                    </img> </li>
                    <li><img src ="https://t4.ftcdn.net/jpg/03/03/62/45/360_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg">
                    </img> </li>
                    <li> <img className = "rightPic" src ="https://i.insider.com/5c79a8cfeb3ce837863155f5?width=600&format=jpeg&auto=webp">
                    </img> </li>
                </ul>
                
            </div>
        
            <div className ="ParagraphHolder">
                    <div>
                        <h1>
                            Welcome to PawHub
                        </h1>
                        <p1  className ="Paragraph">
                            Where all of your pets have their own individual social media profile. Create an account and browse through our open forum, make friends, read rants, and especially share your super cute photos. Don't forget to also check out our Group chat where anything and everything pet related can be discussed! 
                            This is a project for COP4331 Leinecker class. Group 5. 
                            To meet the team be sure to check out our Contact page.
                        </p1>
                    </div>
            </div>
  
        <div className = "Pics"> 

                <ul>
                    <li> <img className = "leftPic" src ="https://hips.hearstapps.com/hmg-prod/images/large-dog-breeds-lead-1550810820.jpg">
                    </img> </li>
                    <li><img src ="https://www.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-10.jpg">
                    </img> </li>
                    <li> <img className = "rightPic" src ="https://gifdb.com/images/high/vibing-dog-dancing-j9wy9n0xuqarevfu.webp">
                    </img> </li>
                </ul>
                
            </div>

            <div className = "footer"></div>

        </div>

    )
}

export default AboutPage;