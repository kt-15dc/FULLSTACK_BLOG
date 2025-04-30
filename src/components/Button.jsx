export function PrimaryButton({ children, className }) {
    return (
      <button className={`px-8 py-3 bg-[#26231E] text-white rounded-full hover:bg-gray-600 transition-colors cursor-pointer text-[16px] leading-[24px] font-base ${className}`}>
        {children}
      </button>
    );
  }
  
  export function OutlineButton({ children, className }) {
    return (
      <button className={`px-10 py-3 bg-white border-[1px] border-[#75716B] text-black rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-[16px] leading-[24px] font-base ${className}`}>
        {children}
      </button>
    );
  }
  