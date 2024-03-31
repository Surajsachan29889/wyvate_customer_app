import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const CardSkeltonWyDet = ({cards}) => {
    return Array(cards).fill(0).map((item, i) => (

        <div  key={i} className='py-2 md:w-[30rem] mx-auto'>
       <div className='card-skeleton '>
        <div className='left-col'>
           <Skeleton circle width={40} height={40}/>
        </div>
        <div className='right-col'>
          <Skeleton count={4} style={{marginBottom: ".6rem"}}/>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-5'>
        <div>
        <Skeleton width={120} height={40}/>
        </div>
        <div>
        <Skeleton  width={120} height={40}/>
        </div>
      </div>

      <div>
        <Skeleton width={100}/>
        <div>
            <Skeleton count={5}  style={{marginBottom: ".6rem"}}/>
        </div>
      </div>

      <div>
      <Skeleton count={4} style={{marginBottom: ".6rem"}}/>
      </div>
    </div>
      
    
       ))
}

export default CardSkeltonWyDet
