import React from 'react'
import { Suspense } from 'react'
import Login from '../_components/Login'
import CardSkelton from '../_components/CardSkelton'

const Page = () => {
 
  return (
    <div>
       <Suspense fallback={<><CardSkelton /></>}>
         <Login />
       </Suspense>
    </div>
  )
}

export default Page
