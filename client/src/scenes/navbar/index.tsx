import {useState} from "react"
import {Link} from "react-router-dom"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Typography, useTheme } from "@mui/material"
import StyledFlexBetween from "../../components/StyledFlexBetween"

type Props = {}

const Navbar = (props: Props) => {
    const {palette} = useTheme()
    const [selected, setSelected] = useState("dashboard");
  return <StyledFlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
    {/* LEFT SIDE */}
    <StyledFlexBetween gap="0.75rem">
        <TrendingUpIcon sx={{fontSize:"28px"}}/>
        <Typography variant="h4" fontSize="16px">
            Stock Market Insight
        </Typography>
    </StyledFlexBetween>

    {/* RIGHT SIDE */}
    <StyledFlexBetween gap="2rem" >
        <Box sx={{"&:hover":{color:palette.primary[100]}}}>
            <Link to="/" onClick={()=>setSelected("dashboard")} style={
                {
                    color:selected==="dashboard"?"inherit":palette.grey[700],
                    textDecoration:"inherit"
                }
            }>
            dashboard
            </Link>
        </Box>
        <Box sx={{"&:hover":{color:palette.primary[100]}}}>
            <Link to="/predictions" onClick={()=>setSelected("predictions")} style={
                {
                    color:selected==="predictions"?"inherit":palette.grey[700],
                    textDecoration:"inherit"
                }
            }>
            predictions
            </Link>
        </Box>
    </StyledFlexBetween>
  </StyledFlexBetween>
  
}

export default Navbar