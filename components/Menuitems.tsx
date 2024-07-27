import { Image } from "@nextui-org/react"
type MenuItemProps = {
    data: {
        id: string;
        name: string;
        price: string;
    };
};
const Menuitems: React.FC<MenuItemProps> = ({ data }) => {
    const { name, price } = data;
    return(
        
        <div className='flex mt-[24px]  justify-between'>
        <div className='flex'>
        <Image src="/foodimage.png" alt="Food Image" width={101.62} height={88.77} />
    <div className='ml-[9.34px]'>
    <Image src="/vegicon.png" alt="Food Image" width={15.18} height={15.71} />
    <div className='mt-[4.27px]'>
       {name}
    </div>
    <div className='text-[#004BAD] text-left'>
        {price}
    </div>
    </div> 
        </div>
    
    <div className='flex items-center '>
        
        <button className='w-[79.56px] h-[36.04px] bg-[#EAF3FF] rounded-[30.03px] font-urbanist text-[#004BAD] text-base font-semibold'>Add</button>
        
        
    </div>
    </div>
        
    )
}
export default Menuitems;