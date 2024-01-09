import { About } from '../About'
import useDocumentTitle from '../../Hook/useDocumentTitle'

export default function AboutP() {

  useDocumentTitle('Koffi Hugues | About me') 

  return (
    <About/>
  )
}
