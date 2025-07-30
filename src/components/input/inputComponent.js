import React from "react"

const InputComponent = ({
  value,
  onChange,
  type = 'text',
  placeholder = 'placeholder',
  className = 'input my-3'
}) =>{
  return(
    <input
        className={className}
        type={type}
        placeholder={placeholder}
        onChange={(value) => onChange(value.target.value)}
        value={value}
    />
  )
}

export default InputComponent