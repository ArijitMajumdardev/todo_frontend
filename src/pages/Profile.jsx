import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader';

export default function Profile() {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading?(
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
