import { Image } from "@nextui-org/react"
export default function Menuitems(){
    return(
        
        <div className='flex mt-[24px]  justify-between'>
        <div className='flex'>
        <Image src="/foodimage.png" alt="Food Image" width={101.62} height={88.77} />
    <div className='ml-[9.34px]'>
    <Image src="/vegicon.png" alt="Food Image" width={15.18} height={15.71} />
    <div className='mt-[4.27px]'>
        Margerita pizza
    </div>
    <div className='text-[#004BAD] text-left'>
        $129.00
    </div>
    </div> 
        </div>
    
    <div className='flex items-center '>
        
        <button className='w-[79.56px] h-[36.04px] bg-[#EAF3FF] rounded-[30.03px] font-urbanist text-[#004BAD] text-base font-semibold'>Add</button>
        
        
    </div>
    </div>
        
    )
}