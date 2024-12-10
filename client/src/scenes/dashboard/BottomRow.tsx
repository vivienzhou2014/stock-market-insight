import React from 'react'
import StyledDashboardBox from '../../components/StyleDashboardBox'

type Props = {}

const BottomRow = (props: Props) => {
  return (
    <>
    <StyledDashboardBox  gridArea="g"></StyledDashboardBox>
        <StyledDashboardBox  gridArea="h"></StyledDashboardBox>
        <StyledDashboardBox  gridArea="i"></StyledDashboardBox>
        <StyledDashboardBox  gridArea="j"></StyledDashboardBox>
    </>
  )
}

export default BottomRow