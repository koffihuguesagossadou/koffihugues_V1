import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Home } from "./pages/Home"
import { Works } from "./pages/Works"
import { FaInstagram, FaLinkedinIn, FaXTwitter,FaRegFilePdf } from "react-icons/fa6";

function App() {

  const text = 'go down'
  const goDownTable = text.split('')

  return (


    <>
      <div id='main-app'>
        <div className="social-media-wrapper">
          <div className="sm instagram">
            <a href="http://">
              <FaInstagram/>
            </a>
          </div>
          <div className="sm linkedin">
            <a href="">
              <FaLinkedinIn/>
            </a>
          </div>
          <div className="sm x">
            <a href="">
              <FaXTwitter/>
            </a>
          </div>
        </div>
        {/* <div className="resume-wrapper">
          <a href="">
            <FaRegFilePdf/>
          </a>
          
        </div> */}
        <Home/>
        <About/>
        <Works/>
        <Contact/>
      </div>
    </>
  )
}

export default App
