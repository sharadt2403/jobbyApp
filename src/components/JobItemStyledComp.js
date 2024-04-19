import styled from 'styled-components'

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin: 2px;
`

export const RowContainer = styled(ColumnContainer)`
  flex-direction: row;
`

export const CompanyLogo = styled.img`
  width: 50px;
  height: 50px;
`
export const Image = styled.img`
  width: 150px;
  height: 150px;
`
