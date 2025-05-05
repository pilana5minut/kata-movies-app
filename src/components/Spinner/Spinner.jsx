import { Spin } from 'antd'
import cl from './Spinner.module.css'

export default function Spinner({ sizeSpinner, message }) {
  return (
    <div className={cl.spinner}>
      <Spin size={sizeSpinner}></Spin>
      <span>{message}</span>
    </div>
  )
}
