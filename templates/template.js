module.exports = {
    templateExample: (userFirstName) => { return ` <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cantora+One&family=Signika&display=swap');
        </style>
    
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cantora+One&family=Signika&display=swap');
    
    html,
    body {
      color: #333;
      font-family: 'Signika', sans-serif;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
    }
    
    /* What it does: Stops email clients resizing small text. */
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    
    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }
    
    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
    /* What it does: Fixes webkit padding issue. */
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }
    
    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
        -ms-interpolation-mode:bicubic;
    }
    
    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
        text-decoration: none;
    }
    
    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }
    
    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }
    
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }
    
    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */
    
    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
    
    </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
    <style>
    
    .primary{
        background: #f3a333;
    }
    
    .bg_white{
        background: #435B38;
    }
    .bg_light{
        background: #fafafa;
    }
    .bg_black{
        background: #435B38;
    }
    .email-section{
        padding:1.5em;
    }
    
    .brand-name{
      width: 180px;
    }
    
    .brand-logo{
      width: 60px;
      margin-right: 10px;
    }
    
    /*BUTTON*/
    .btn{
        padding: 10px 15px;
    }
    .btn.btn-primary{
        border-radius: 30px;
        background: #435B38;
        color: #d6fbd6;
    }
    
    .btn.btn-primary:hover{
        border-radius: 30px;
        background: #d6fbd6;
        color: #435B38;
    }
    
    
    
    h1,h2,h3,h4,h5,h6{
        font-family: 'Signika', sans-serif;
        color: #000000;
        margin-top: 0;
    }
    
    body{
        font-family: 'Signika', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
    }
    
    #custom-header{
      color: #333;
    }
    
    /*LOGO*/
    
    .logo h1{
        margin: 0;
    }
    .logo h1 a{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
    }
    
    /*HERO*/
    .hero{
        position: relative;
    }
    .hero img{
    
    }
    .hero .text{
        color: #333;
    }
    .hero .text h2{
        color: #ffffff;
        font-size: 30px;
        margin-bottom: 0;
    }
  
    #main-img{
      background-size: cover;
     background-repeat: no-repeat;
     background-position: right;
     width: 100%;
    }
    
    
    /*HEADING SECTION*/
    
    .heading-section h2{
        color: #000000;
        font-size: 28px;
        margin-top: 0;
        line-height: 1.4;
    }
    .heading-section .subheading{
        margin-bottom: 20px !important;
        display: inline-block;
        position: relative;
    }
    .heading-section .subheading::after{
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        content: '';
        width: 100%;
        height: 2px;
        background: #DD885B;
        margin: 0 auto;
    }
    
    .heading-section-white{
    color: white;
    }
    
    .heading-section-white h2{
        font-size: 28px;
    }
    
    /*SERVICES*/
    .main-text{
      color: #333;
      font-size: 18px;
    }
    
    .text{
      color: #d6fbd6;
    }
    
    
    
    /*COUNTER*/
    .counter-text{
        text-align: center;
    }
    .counter-text .num{
        display: block;
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
    }
    .counter-text .name{
        display: block;
        color: #333;
        font-size: 13px;
    }
    
    
    /*FOOTER*/
    
    .footer{
        color: #d6fbd6;
    
    }
    .footer .heading{
        color: #d6fbd6;
        font-size: 20px;
    }
    .footer ul{
        margin: 0;
        padding: 0;
    }
    .footer ul li{
        list-style: none;
        margin-bottom: 10px;
    }
    .footer ul li a{
        color:#d6fbd6;
    }
    
    
    @media screen and (max-width: 500px) {
    
        .icon{
            text-align: left;
        }
    
        .text-services{
            padding-left: 0;
            padding-right: 20px;
            text-align: left;
        }
    
    }
    
    </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td class="bg_white logo" style="padding: 1em 2.5em; display: flex; text-align: center; align-items: center; justify-content:center;">
                <a href="https://plantastic-shop.netlify.app/"><img src="https://res.cloudinary.com/dm6a8aocc/image/upload/v1675528230/third-project/logo_btofaj.png" class="brand-logo"/><img src="https://res.cloudinary.com/dm6a8aocc/image/upload/v1675528230/third-project/image-name_e0qqew.png" class="brand-name"></a>
              </td>
              </tr><!-- end tr -->
                    <tr>
              <td valign="middle" class="hero" id="main-img" style="background-image: url(https://res.cloudinary.com/dm6a8aocc/image/upload/v1676317348/third-project/cacti_zbcydp.png); background-size: cover; height: 400px;">
                <table>
                    <tr>
                        <td>
                            <div class="text" style="padding: 0 3em; text-align: center;">
                                <h2 id="custom-header">Thank you for your order!</h2>
                                <p><a href="https://plantastic-shop.netlify.app/profile" class="btn btn-primary">Check Your Order Here!</a></p>
                            </div>
                        </td>
                    </tr>
                </table>
              </td>
              </tr><!-- end tr -->
                      <tr>
                        <td class="bg_light email-section">
                            <div class="heading-section" style="text-align: center; padding: 0 30px;">
                                
                              <h2 class="subheading">Dear ${userFirstName},</h2>
                              <p class="main-text">We hope this email finds you in good leaves! 🍃 </br> </br> We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life. </br>
                        </br> We're pretty sure your plants are already thanking you for giving them such a loving new home.
                          If you have any questions or concerns, don't hesitate to reach out. We're always here to help water the plants...err...your worries away!
                        </br></br> Stay green and happy growing! </br></br>
                          Best regards, </br>
                          The Plantastic Team 🪴</p>
                            </div>
                            <table role="presentation" border="0" cellpadding="10" cellspacing="0" width="100%">
                      
                    </table>
    
                  </td>
                </tr><!-- end:tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_black footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <h3 class="heading" style="padding-left: 20px;">Plantastic</h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                        <li><span class="text">At Plantastic, we are always here to help! If you have any questions or concerns, please don't hesitate to reach out to us.</span></li>
                                        <li><span class="text">support@plantastic.com</span></a></li>
                              <li><span class="text">(555) 555-5555</span></a></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 10px;">
                              <h3 class="heading">Our Products</h3>
                              <ul>
                                        <li>Indoor Plants</li>
                                        <li>Outdoor Plants</li>
                                        <li>Tropical Plants</li>
                                        <li>Pet-Friendly Plants</li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
                <td valign="middle" class="bg_black footer email-section">
                    <table>
                    <tr>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <p style="padding-left: 20px;">&copy; Plantastic</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>  
    ` }
}
  
