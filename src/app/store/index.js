import {configureStore} from '@reduxjs/toolkit'
import userdetailSlice from './userdetailslice'
import bookingidslice from './bookingidslice'

const authStore = configureStore({

    reducer:{

        userdetails: userdetailSlice,
        bookingId: bookingidslice
      
    }
})

export default authStore