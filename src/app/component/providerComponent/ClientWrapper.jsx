"use client";

import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';

export default function ClientWrapper({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}