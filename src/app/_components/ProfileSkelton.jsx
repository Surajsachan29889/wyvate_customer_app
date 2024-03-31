import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProfileSkelton = ({cards}) => {
    return Array(cards).fill(0).map((item, i) => (

        <div  key={i} className='py-2 md:w-[30rem] mx-auto p-4'>
       <div>
       <div className='flex justify-center pt-5'>
       <Skeleton circle width={80} height={80}/>
       </div>
       
        <div className='pt-10 space-y-3'>
         <div>
         <Skeleton width={200} count={1} style={{marginBottom: '0.6rem'}}/>
         <Skeleton width={250} count={1} style={{marginBottom: '0.6rem'}}/>
         <Skeleton width={300} count={1} style={{marginBottom: '0.6rem'}}/>
         <Skeleton width={300} count={1} style={{marginBottom: '0.6rem'}}/>
         </div>
         <div>
   
         </div>
         
        </div>
      </div>
    </div>
      
    
       ))
}

export default ProfileSkelton
