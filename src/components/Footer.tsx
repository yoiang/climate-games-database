import Image from 'next/image'

export const Footer = (): JSX.Element => (
  <footer>
    <div className="logo">
      <a
        href="https://igda.org/climate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/logos/igda-white.png"
          alt="IGDA Logo"
          height={`${1086 / 20}`}
          width={`${2700 / 20}`}
        />
      </a>
    </div>

    <div className="actions">
      <div className="join">
        <a href="https://igda.org/membership/" className="join-now">
          Join Now
        </a>
      </div>

      <div className="footer-social-links">
        <ul className="footer-social-links">
          <li>
            <a
              href="https://www.facebook.com/IGDA.org"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/IGDAHQ"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/igda"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/company/igda/"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/company/igda/"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </li>

          <li>
            <a
              href="https://www.twitch.tv/igda"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitch"></i>
            </a>
          </li>

          <li>
            <a
              href="https://discord.gg/igda"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-discord"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* <div className="bottom">
            <p>© 2021 by IGDA All rights reserved.</p>
        </div> */}

    <style jsx>{`
      footer {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        background-color: black;
        flex-direction: column;
      }

      footer .logo {
        margin-top: 10px;
        margin-bottom: 10px;
      }

      footer .actions {
        width: 100%;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: center;
      }

      footer .actions .footer-social-links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      footer a.join-now {
        margin: 10px;

        color: #d81315;
        border: 2px solid #d81315;

        text-transform: uppercase;
        letter-spacing: 0.02em;
        font-family: Helvetica Neue LT W05_65 Medium, Arial, sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        padding-left: 55px;
        padding-right: 55px;
        padding-top: 13px;
        padding-bottom: 13px;

        display: inline-block;
        transition: all 0.4s ease;

        white-space: nowrap;
      }

      footer a.join-now:hover {
        color: #fff;
        text-decoration: none;
        border-color: #fff;
      }
      footer ul.footer-social-links {
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
      }
      footer ul.footer-social-links > li {
        display: inline-block;
        margin-right: 25px;
      }
      footer ul.footer-social-links > li:last-of-type {
        margin-right: 0;
      }
      footer ul.footer-social-links > li a .fab {
        font-size: 23px;
        color: #707070;
        -webkit-transition: all 0.4s ease;
        -moz-transition: all 0.4s ease;
        -o-transition: all 0.4s ease;
        -ms-transition: all 0.4s ease;
        transition: all 0.4s ease;
      }
      footer ul.footer-social-links > li a:hover .fab {
        color: #fff;
      }

      footer > .bottom {
        width: 100%;

        display: flex;
        flex-wrap: wrap;

        justify-content: center;
        align-items: center;

        margin-right: auto;
        margin-left: auto;

        padding-top: 30px;
        padding-bottom: 30px;
        padding-right: 15px;
        padding-left: 15px;

        background-color: #1e1e1e;

        text-align: center;
      }

      footer > .bottom > p {
        margin-top: 0;
        margin-bottom: 0;
        color: #fff;
        letter-spacing: 0.02em;
        opacity: 0.5;
        display: inline-block;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `}</style>
  </footer>
)

export default Footer
