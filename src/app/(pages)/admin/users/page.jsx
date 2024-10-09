import TableAdmin from '@/app/component/TableAdmin';
import React from 'react';

const User = () => {
  return (
    <div>
      <button className="btn btn-primary mb-2">Thêm quản trị viên</button>
      <TableAdmin/>
    </div>
  );
};

export default User;
