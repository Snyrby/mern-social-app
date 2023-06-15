import React, { useContext, useState, useEffect } from 'react';

const fetchUser = async (values, obSub) => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };