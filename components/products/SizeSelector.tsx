import { FC } from "react"
import { ISize } from "../../interfaces"
import { Box, Button } from "@mui/material"

interface Props {
    selectedSize?: ISize
    Sizes: ISize[]
    onSelectedSize:(size:ISize)=> void
}

export const SizeSelector:FC<Props> = ({selectedSize, Sizes, onSelectedSize}) => {
  return (
    <Box>
        {
            Sizes.map(size=>(
                <Button key={size} size="small" color={selectedSize===size?'primary' :"info"} onClick={()=>(onSelectedSize(size))}>
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
