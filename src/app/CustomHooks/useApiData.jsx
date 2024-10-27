// useApiData.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useApiData = (apiAction, selector) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const data = useSelector(selector);

  const fetchData = async () => {
    setLoading(true);
    try {
      await dispatch(apiAction());
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return { loading, data };
};

export default useApiData;
