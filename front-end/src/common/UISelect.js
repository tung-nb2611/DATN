import React from "react";
const UISelect = ({
  onChange,
  children,
  value,
  disabled,
  styleProps,
  className,
}) => {
  return (
    <div
      style={styleProps ? styleProps : {}}
      className={`ui-select__wrapper next-input--has-content ${
        className || ""
      }`}
    >
      <select
        disabled={disabled || false}
        className="ui-select"
        name="District"
        value={value || ""}
        onChange={onChange}
      >
        {children}
      </select>
      <svg
        style={{ marginTop: "-10px" }}
        className="next-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_12046_2139)">
          <path
            d="M7.56053 10.8491L11.3505 14.6391C11.5505 14.8391 11.8605 14.8391 12.0605 14.6391L15.8505 10.8491C16.1605 10.5391 15.9405 9.99906 15.5005 9.99906L7.91053 9.99906C7.47053 9.99906 7.24053 10.5391 7.56053 10.8491Z"
            fill="#A3A8AF"
          />
        </g>
        <defs>
          <clipPath id="clip0_12046_2139">
            <rect
              width="4.79"
              height="8.59"
              fill="white"
              transform="translate(7.41016 14.7891) rotate(-90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default UISelect;
