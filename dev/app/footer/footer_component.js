'use strict';

import React from 'react';

export default (props)=>{
    return(
      <div>
        <div className="pre-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-offset-1 col-md-4 pre-footer-col">
                <h2>About us</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam sit nonummy nibh euismod tincidunt ut laoreet dolore magna aliquarm erat sit volutpat. Nostrud exerci tation ullamcorper suscipit lobortis nisl aliquip  commodo consequat. </p>
                <p>Duis autem vel eum iriure dolor vulputate velit esse molestie at dolore.</p>
              </div>
              <div className="col-md-offset-2 col-md-4 pre-footer-col">
                <h2>Our Contacts</h2>
                <div className="address">
                  510 E Peltason Dr, Irvine, CA 92697, US<br />
                  Phone: 100 123 3456<br />
                  Fax: 100 123 6543<br />
                  Email: <a href="mailto:info@chuckit.com">info@chuckit.com</a><br />
                  Skype: <a href="skype:chuckit">chuckit</a>
                </div>
                <div>
                  <ul className="social-icons">
                    <li>
                      <a className="rss" ></a>
                    </li>
                    <li>
                      <a className="facebook"></a>
                    </li>
                    <li>
                      <a className="twitter"></a>
                    </li>
                    <li>
                      <a className="googleplus"></a>
                    </li>
                    <li>
                      <a className="linkedin"></a>
                    </li>
                    <li>
                      <a className="youtube"></a>
                    </li>
                    <li>
                      <a className="vimeo"></a>
                    </li>
                    <li>
                      <a className="skype"></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="text-center">
                Copyright &copy; {new Date().getFullYear()} ChuckIt. ALL Rights Reserved. 
              </div>
            </div>
          </div>
        </div>
      </div>      
    );
  };