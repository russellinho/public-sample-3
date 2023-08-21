import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SEARCH_BUTTON_EDGE = 35;

const searchFieldInputStyle = {
  fontSize: 14,
  padding: "0 8px",
  flex: 1,
  fontWeight: 100,
  height: SEARCH_BUTTON_EDGE - 2,
};

const SearchIcon = () => {
  const iconEdge = Math.ceil(SEARCH_BUTTON_EDGE * 0.6);
  const searchIconStyle = {
    fill: "#757575",
  };
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width={iconEdge}
      height={iconEdge}
      viewBox="0 0 635 635"
      style={searchIconStyle}
    >
      <g>
        <path
          d="M255.108,0C119.863,0,10.204,109.66,10.204,244.904c0,135.245,109.659,244.905,244.904,244.905
          c52.006,0,100.238-16.223,139.883-43.854l185.205,185.176c1.671,1.672,4.379,1.672,5.964,0.115l34.892-34.891
          c1.613-1.613,1.47-4.379-0.115-5.965L438.151,407.605c38.493-43.246,61.86-100.237,61.86-162.702
          C500.012,109.66,390.353,0,255.108,0z M255.108,460.996c-119.34,0-216.092-96.752-216.092-216.092
          c0-119.34,96.751-216.091,216.092-216.091s216.091,96.751,216.091,216.091C471.199,364.244,374.448,460.996,255.108,460.996z"
        />
      </g>
    </svg>
  );
};

export default function SearchField({
  searchText,
  placeholder,
  disabled,
  onChange,
  onClear,
  onBlur,
}: {
  searchText?: string;
  placeholder: string;
  disabled?: boolean;
  onChange: any;
  onClear: any;
  onBlur?: any;
}) {
  const [value, setValue] = useState(searchText);

  useEffect(() => {
    setValue(searchText);
  }, [searchText, setValue]);

  const onChangeHandler = useCallback(
    (event: any) => {
      setValue(event.target.value);
      onChange?.(event.target.value, event);
    },
    [onChange, setValue]
  );

  const onBlurHandler = useCallback(
    (event: any) => {
      onBlur?.(event.target.value, event);
    },
    [onBlur]
  );

  return (
    <div className="inline-flex flex-row items-center justify-between h-[35] bg-[#2C2C2C] py-[6px] px-[12px] rounded-[4px] w-[100%] md:w-[auto]">
      <SearchIcon />
      <input
        className="outline-none border-none bg-[#2C2C2C] font-poppins placeholder-[#757575] text-white w-[100%]"
        style={searchFieldInputStyle}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        type="text"
        value={value}
        disabled={disabled}
      />
      <button
        className="relative w-[20px] h-[20px]"
        onClick={() => {
          onClear();
          setValue("");
        }}
      >
        <Image
          src={"/icons/ic_close_gray.svg"}
          alt="avatar"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </button>
    </div>
  );
}
