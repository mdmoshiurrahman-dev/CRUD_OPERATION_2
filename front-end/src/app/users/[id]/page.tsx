import React from 'react'

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const {id} = await params
  const res = await fetch(`http://localhost:5000/${id}`)
  const data = await res.json();
  console.log(data)
  
  return (
    <div>
        <p>{data._id}</p>
        <p>{data.name}</p>
        <p>{data.email}</p>
    </div>
  )
}

export default UserDetailsPage