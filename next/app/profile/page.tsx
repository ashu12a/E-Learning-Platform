'use client'
import React,{FC, useState} from 'react'
import Protected from '../components/hook/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'

type Props = {}

const page:FC<Props> = (props) => {
  const [open,setOpen] = useState(false);
  const [activeItem,setActiveItem] = useState(0);
  const [route,setRoute] = useState('Login');
  return (
    <div>
      <Protected>
        <Heading
        title='Elearning'
        description='this is elearning plateform'
        keywords='Programming,React'
        />

        <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route} 
        />
      </Protected>
    </div>
  )
}

export default page