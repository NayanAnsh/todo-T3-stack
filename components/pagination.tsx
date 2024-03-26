import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import CardComponent from './card'
  const data = [{

  }]
  const ITEMS_PER_PAGE = 3
  const cards = [<CardComponent/>,<CardComponent/> , <CardComponent/> , <CardComponent/> ,<CardComponent/> ,<CardComponent/>,<CardComponent/>]
  const PaginationComponent = ({searchParams}:{searchParams:{[key:string]:string | undefined }}) => {
    console.log("---")
    console.log(searchParams)
    const item_per_page = parseInt(searchParams["items"] || ITEMS_PER_PAGE.toString())
    const pageNo:number =  parseInt(searchParams["page"] || "1")
    const index = item_per_page*pageNo ;
    const items = cards.slice(index-item_per_page , index)
    const maxPage = Math.round(cards.length/ item_per_page)

    const paginationItems:number[] = []
    for(let i = 1 ; i <= maxPage+1; i++){
        console.log(i)
        paginationItems.push(i)
    }
     
  return (

    <div className='p-4' >
        
        
        <div className=' transition-all mx-auto grid grid-cols-2 lg:grid-cols-3 max-w-5xl ' >
            {items.map((item)=>{
                return <h2> {item}</h2>
            })}
        </div>
        <div>
        <Pagination>
  <PaginationContent>
  
    <PaginationItem>
      <PaginationPrevious href={`?item=${ITEMS_PER_PAGE}&page=${ pageNo != 1 ?pageNo-1: maxPage} `} />
    </PaginationItem>
    
    {paginationItems.map((index)=>{

return <PaginationItem>
<PaginationLink href={`?item=${ITEMS_PER_PAGE}&page=${index}`}  isActive={pageNo == index }>{index}</PaginationLink>
</PaginationItem> ;
})}
    <PaginationItem>
      <PaginationNext href={`?item=${ITEMS_PER_PAGE}&page=${ pageNo<=maxPage ?pageNo+1: 1} `} />
    </PaginationItem>
  </PaginationContent>
</Pagination>


        </div>

       
    </div>
  )
}

export default PaginationComponent