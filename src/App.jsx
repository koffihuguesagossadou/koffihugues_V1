import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Home } from "./pages/Home"
import { Works } from "./pages/Works"
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

function App() {

  const text = 'go down'
  const goDownTable = text.split('')

  return (


    <>
      <div id='main-app'>
        <div className="social-media-wrapper">
          <div className="instagram">
            <FaInstagram/>
          </div>
          <div className="instagram">
            <FaLinkedinIn/>
          </div>
          <div className="instagram">
            <FaXTwitter/>
          </div>
          {/* <div className="instagram">
            <FaInstagram/>
          </div> */}
        </div>
        <div className="go-down-wrapper">
          {
            goDownTable.map((value, index)=>{
              return <span key={index}>{value}</span>
            })
          }
          {/* <div className="instagram">
            <FaInstagram/>
          </div> */}
        </div>
        <Home/>
        <About/>
        <Works/>
        <Contact/>
      </div>
    </>
  )
}

export default App
