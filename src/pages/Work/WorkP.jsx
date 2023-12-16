import React, {Suspense, lazy} from 'react'
const Works = lazy( ()=> import('../Works'))

export default function WorkP() {


  return (

    <Suspense fallback={null} >
      <Works/>
    </Suspense>
  )
}
