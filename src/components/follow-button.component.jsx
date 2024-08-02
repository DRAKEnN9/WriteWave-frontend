// FollowButton.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FollowButton = ({ userId, access_token }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [ currentUserId, setCurrentUserId ] = useState(null);

  const checkFollowingStatus = async () => {

    if(!access_token){
      return;
    }

    const payload = { followId: userId };

        await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/check-following", payload,{
          headers: { Authorization: `Bearer ${access_token}` }
        })
        .then(res => {
          setIsFollowing(res.data.isFollowing)
          setCurrentUserId(res.data.userId)
        })
      .catch (error => {
          console.error('Error checking following status:', error);
        return false;
    })
}

  useEffect(() => {

    checkFollowingStatus();

}, [userId]);

  const handleFollow = ( ) => {

    if(!access_token){
      return(
        toast.error("Please login first to follow the author")
      )
    }

    if (!userId) {
      console.error("User ID is not provided");
      return;
    }

    const payload = { followId: userId };

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/follow", payload, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    .then(response => {
      console.log(response.data);
      setIsFollowing(true);
    })
      .catch(error => {
        console.error("There was an error following the user!", error);
      });
  };

  const handleUnFollow = ( ) => {

    if (!userId) {
      console.error("User ID is not provided");
      return;
    }

    const payload = { followId: userId };

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/unfollow", payload, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    .then(response => {
        console.log(response.data);
      setIsFollowing(false);
    })
      .catch(error => {
        console.error("There was an error following the user!", error);
      });
  };

  if( userId != currentUserId ){
    return (
      <button 
        onClick={isFollowing ? handleUnFollow : handleFollow}
        className={ 
          !isFollowing ? 
            "px-6 mx-4 py-2 bg-blue-500 text-white border border-blue-500 rounded hover:bg-blue-700" : 
            "px-4 mx-4 py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-gray-200"
        }
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    );
  }else{
    return "";
  }

};

export default FollowButton;
