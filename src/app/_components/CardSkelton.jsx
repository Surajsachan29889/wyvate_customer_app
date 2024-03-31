import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const CardSkelton = ({cards}) => {
 
   return Array(cards).fill(0).map((item, i) => (

    <div key={i} className='card-skeleton mt-5 border-zinc-200 border-[1px] border-solid md:w-[30rem] mx-auto'>
    <div className='left-col'>
       <Skeleton circle width={40} height={40}/>
    </div>
    <div className='right-col'>
      <Skeleton count={3} style={{marginBottom: ".6rem"}}/>
    </div>
  </div>

   ))
  
}

export default CardSkelton
