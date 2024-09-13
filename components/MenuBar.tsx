"use client"
import { useMemo, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Filterbar from './homePagecomponents/Filterbar';
import Navbar from './homePagecomponents/Navbar'
import Searchbar from "./homePagecomponents/Searchbar";
import Menuitems from './Menuitems';
import { useSelector } from "react-redux";
import FilterbarMenu from "./filterbarMenu";

// Define proper types for your props
interface MenuBarProps {
  menuData: {
    id: string;
    name: string;
    location: string;
    phone: string | null;
    img: string;
    time: string;
    menu: {
      id: string;
      restaurantId: string;
      categories: Array<{
        id: string;
        name: string;
        menuId: string;
        items: Array<{
          id: string;
          name: string;
          price: number;
          categoryId: string;
          customizations: Array<{
            id: string;
            name: string;
            price: number;
            menuItemId: string;
          }>;
        }>;
      }>;
    };
  };
}

export default function MenuBar({ menuData }: MenuBarProps) {
    const router = useRouter();
    const cartTotalQuantity = useSelector((state:any) => state.cart.totalQuantity);
    const cartTotalAmount = useSelector((state:any) => state.cart.totalAmount);
    const [searchTerm, setSearchTerm] = useState('');

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredMenu = useMemo(() => {
      let filteredCategories = menuData.menu.categories;
  
      // Filter by active category
      if (activeCategory) {
        filteredCategories = filteredCategories.filter(category => 
          category.id === activeCategory
        );
      }
  
      // Filter by search term
      if (searchTerm) {
        filteredCategories = filteredCategories.map(category => ({
          ...category,
          items: category.items.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(category => category.items.length > 0);
      }
  
      return filteredCategories;
    }, [menuData, searchTerm, activeCategory]);
  
    const handleCategoryFilter = (categoryId: string | null) => {
      setActiveCategory(categoryId === activeCategory ? null : categoryId);
    };


    const handleBackClick = () => {
        router.push("/");
    };

    const routetocart = () => {
        router.push("/cart");
    };

    return (
        <div className='flex'>
            <div className='hidden lg:block'>
                <Navbar/>
            </div>
        
            <div className='w-full'>
                <div className='max-w-[889px] mx-auto'>
                    <div className='bg-blue-800 h-[120px] w-full lg:h-[168px] lg:w-[889px] lg:mt-[24px] rounded-b-[8px] lg:rounded-[24px] text-center text-blue'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex'>
                                <div className='p-4 pt-16'>
                                    <Image src='/arrowWhite.png' className='hover:cursor-pointer rounded-full' onClick={handleBackClick} width={24} height={24} alt="Back arrow" />
                                </div>
                                <div className='font-semibold text-[#FCFCFC] leading-[26.4px] text-[25.7px] pt-16 text-left'>
                                    {menuData.name}
                                </div>
                            </div>
                            <div className='flex pt-16 pr-8'>
                                <div className='pt-1 pr-2'>
                                    <Image src='/door-01.png' width={15} height={15} alt="Door icon" />
                                </div>
                                <div className='text-[#FCFCFCB2]'>
                                    {menuData.time}
                                </div>
                            </div>
                        </div>
                        <div className='flex lg:justify-end'>
                            <div className='text-slate-400 pl-14 absolute top-[5.5rem] lg:pr-2 lg:mt-8'>
                                Delivering in {menuData.time}
                            </div>
                        </div>
                    </div>

                    <div className=' mt-4 flex justify-center'>
                        <Searchbar  searchtext={searchTerm} setsearchtext={setSearchTerm}/>
                    </div>
                    <div className='mt-4 flex justify-center '>
                        <FilterbarMenu  categories={menuData.menu.categories}
                                        activeCategory={activeCategory}
                                         onCategorySelect={handleCategoryFilter}
                        />
                    </div>
            
                    <div className='h-screen pl-[24px] pr-[24px] overflow-y-auto'>
                        {filteredMenu.map((category) => (
                            <div key={category.id} className='lg:w-[729px] lg:ml-20 mt-8'> 
                                <div className=' mt-[32px] text-lg text-left font-semibold text-[#004BAD]'>
                                    {category.name}
                                </div>
                       
                                {category.items.map(item => (
                                    <Menuitems key={item.id} data={item}/>
                                ))}
                            </div>
                        ))}
                        <div className='h-[50%]'></div>
                    </div>

                            {cartTotalQuantity==0?<div></div>:<div className='bg-blue-800 h-[104px] w-full flex justify-between items-center lg:h-[56.38px] lg:w-[892px] mt-[30px] lg:rounded-t-[24px] fixed bottom-0 z-50'>
                        <div className='lg:pl-[32px] flex pl-[24px] gap-[30px] text-white text-xs'>
                            <div>
                                <div className='text-base flex justify-center'>{cartTotalQuantity}</div>
                                <div className='text-[#719AD0] font-light'>Total Count</div>
                            </div>
                            <div>
                                <div className='text-base'>₹  {cartTotalAmount>=0? cartTotalAmount : 0}</div>
                                <div className='text-[#719AD0] font-light'>Total Price</div>
                            </div>
                        </div>
                        <div className='pl-4 lg:mr-[32px] mr-[24px]'>
                            <button className='bg-primary-100 text-primary-700 w-[138px] h-[38px] rounded-[25.71px] flex justify-center items-center font-semibold text-base' onClick={routetocart}>
                                View Cart 
                                <Image src='/cartI.png' className='ml-2' width={18} height={18} alt="Cart Image" />
                            </button>
                        </div>
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}