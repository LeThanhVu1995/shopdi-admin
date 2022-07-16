import React from 'react';
import { Select } from 'antd';
import { useLng } from '../hook/useLng';

const { Option } = Select;

export default function SelectLanguage() {
  const { lng, changeLng } = useLng();

  return (
    <div className="mt-5">
      <Select defaultValue={lng} style={{ width: 120 }} onChange={changeLng}>
        <Option value="en">English</Option>
        <Option value="kr">Korean</Option>
      </Select>
    </div>
  );
}
