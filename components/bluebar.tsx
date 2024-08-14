import { Image } from "@nextui-org/react";

export default function Bluebar({title}){
    return <div className='w-full  h-[7.5rem] bg-[#004BAD] flex items-end'>
    <div className='flex pb-4'>
    <div className='p-4 '>     
    <Image src="/arrowWhite.png" alt="Arrow logo" width={17.27} height={24} className="mr-2" />
    </div>
    <div className='text-[#FCFCFC] leading-[26.4px] text-[22px] font-semibold  pt-3.5'>
    {title}
    </div>
    </div>
</div>
}