import React from 'react'
import { Grid, Table } from 'semantic-ui-react'
import PartRow from './PartRow'

const AvailabilityGrid = ({ partNumbers, shops }) =>
  (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Table celled structured>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell rowSpan='2'>Model</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Size</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Connectivity</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Part Number</Table.HeaderCell>
                <Table.HeaderCell colSpan={Object.keys(shops).length}>Retail Shops</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                {
                  Object.keys(shops).map((shopKey) => (
                    <Table.HeaderCell key={shopKey}>{shops[shopKey].storeName}</Table.HeaderCell>
                  ))
                }
              </Table.Row>
            </Table.Header>

            {
              Object.keys(partNumbers).map((partNumber) => (
                <PartRow
                  model={partNumber}
                  shopKeys={Object.keys(shops)}
                  sizes={partNumbers[partNumber]}
                />
              ))
            }
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

export default AvailabilityGrid
