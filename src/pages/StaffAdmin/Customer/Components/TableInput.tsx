import React, {useState} from 'react'
import { Form, Input,DatePicker} from 'antd';
import styles from './index.less'
import moment from 'moment';

interface TableInputProps {
  name: string;
  inputType?: string;
  defaultValue?: any;
}

const TableInput: React.FC<TableInputProps> = (props) => {
  const {defaultValue} = props
  const [value] = useState(defaultValue)

  const renderInput = () => {
    if(props.name === 'birthday') {
      return <DatePicker format="YYYY-MM-DD" />
    }
    return <Input value={value} placeholder={'请输入'}/>
  }

  return <div className={styles.tableInput} style={{height:'100%'}}>
      <Form.Item
        name={props.name}
        // 对 birthday 字段进行值转换处理，将字符串转为 moment 对象
        getValueProps={props.name === 'birthday' ? (val) => ({
          value: val && val !== '' ? moment(val, 'YYYY-MM-DD') : null
        }) : undefined}
        normalize={props.name === 'birthday' ? (val) => {
          return val && moment.isMoment(val) ? val.format('YYYY-MM-DD') : '';
        } : undefined}
      >
        {renderInput()}
      </Form.Item>
    </div>

}
export default TableInput;
