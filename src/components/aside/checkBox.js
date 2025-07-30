import React from "react"

const CheckBox = ({
  type = 'checkbox',
  placeholder = 'placeholder',
  className = 'checkbox',
  onChange = () => null,
}) =>{
  return(
    <label className="checkbox">
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
        />
        {placeholder}
    </label>
  )
}

export default CheckBox