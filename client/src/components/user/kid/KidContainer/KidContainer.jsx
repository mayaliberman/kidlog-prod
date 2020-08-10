import React, { useContext, useEffect } from 'react';
import KidCard from '../KidCard/KidCard';
import UserContext from '../../../../context/user/userContext';
import { getUser } from '../../../../services/cookies';
const KidContainer = () => {
  const userContext = useContext(UserContext);
  const { child } = userContext;
  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [child, user]);
  if (!user.children) {
    return null;
  } else {
    return (
      <>
        {user.children
          .filter((kid) => (kid = kid.active === true))
          .map((child) => {
            return <KidCard key={child.id} name={child.name} id={child.id} />;
          })}
      </>
    );
  }
};

export default KidContainer;
