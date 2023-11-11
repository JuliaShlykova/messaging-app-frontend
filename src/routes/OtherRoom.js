import React from 'react'
import { useParams } from 'react-router-dom'

const OtherRoom = () => {
  const {roomId} = useParams();

  return (
    <div>OtherRoom {roomId}</div>
  )
}

export default OtherRoom