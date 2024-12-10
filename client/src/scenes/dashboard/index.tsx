import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import StyledDashboardBox from '../../components/StyleDashboardBox'
import UpperRow from './UpperRow'
import MiddleRow from './MiddleRow'
import BottomRow from './BottomRow'


const gridTemplate = `
    "a a b"
    "a a c"
    "a a c"
    "d d d"
    "d d d"
    "e e e"
    "e e e"
`

const gridTemplateSmall = `
    "a"
    "a"
    "a" 
    "a"
    "a" 
    "a" 
    "b"  
    "c" 
    "c" 
    "d"
    "d"
    "d"
    "d"
    "d"
    "d"
    "d" 
    "e"
    "e"
    "e"
    "e"
    "e"
    "e"
`

const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width:600px)")
  return (
    <Box width="100%"  display="grid" gap="1.5rem"// Removed height="100%" to allow natural growth
    sx={
        isAboveMediumScreens ?{
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateRows: 'auto',// Allow rows to grow based on content
            gridTemplateAreas:gridTemplate,
        }: {
            gridAutoColumns: "1fr",
            gridAutoRows: 'minmax(80px, auto)', // Allow rows to grow based on content
            gridTemplateAreas:gridTemplateSmall,
        }
    }>
        <UpperRow/>

    </Box>
  )
}

export default Dashboard