// import { useCallback } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks';
// import {
//   login as socketLogin,
//   register as socketRegister,
//   verifyAuthToken,
//   socketConnect,
//   socketDisconnect
// } from '../middleware/gameSocketMiddleware';
// import { loginStart, logout, clearError } from '../slices/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AnyAction } from 'redux';

// export const useAuth = () => {
//   const dispatch = useAppDispatch();
//   const auth = useAppSelector(state => state.auth);

//   const login = useCallback((username: string, password: string) => {
//     dispatch(loginStart());
//     dispatch(socketConnect() as AnyAction);

//     // Give the socket a moment to connect
//     setTimeout(() => {
//       dispatch(socketLogin(username, password) as AnyAction);
//     }, 500);
//   }, [dispatch]);

//   const register = useCallback((username: string, email: string, password: string) => {
//     dispatch(loginStart());
//     dispatch(socketConnect() as AnyAction);

//     // Give the socket a moment to connect
//     setTimeout(() => {
//       dispatch(socketRegister(username, email, password) as AnyAction);
//     }, 500);
//   }, [dispatch]);

//   const logoutUser = useCallback(async () => {
//     try {
//       await AsyncStorage.removeItem('authToken');
//       await AsyncStorage.removeItem('playerID');
//       await AsyncStorage.removeItem('username');

//       dispatch(logout());
//       dispatch(socketDisconnect() as AnyAction);
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   }, [dispatch]);

//   const verifyToken = useCallback(async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       if (token) {
//         dispatch(socketConnect() as AnyAction);

//         // Give the socket a moment to connect
//         setTimeout(() => {
//           dispatch(verifyAuthToken(token) as AnyAction);
//         }, 500);
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//     }
//   }, [dispatch]);

//   const resetError = useCallback(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   return {
//     isAuthenticated: auth.isAuthenticated,
//     user: auth.user,
//     isLoading: auth.isLoading,
//     error: auth.error,
//     login,
//     register,
//     logout: logoutUser,
//     verifyToken,
//     resetError
//   };
// };
