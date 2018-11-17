import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import _ from 'lodash'

const PartRow = ({ model, shopKeys, sizes }) =>
  (
    <Table.Body>
      {
        _.map(sizes, (connectivities, size) => {
          return _.map(connectivities, (parts, connectivity) => {
            return (
              <Table.Row>
                {
                  (
                    (size === Object.keys(sizes)[0]) &&
                    (connectivity === Object.keys(connectivities)[0])
                  ) && <Table.Cell rowSpan={_.reduce(sizes, (acc,v,k) =>
                    acc + _.reduce(v, (acc2,v2,k2) => acc2 + 1, 0)
                  ,0)}>{model}</Table.Cell>
                }

                {
                  (connectivity === Object.keys(connectivities)[0])
                  &&
                  <Table.Cell rowSpan={Object.keys(connectivities).length}>{size}</Table.Cell>
                }
                <Table.Cell>{connectivity}</Table.Cell>
                <Table.Cell>{parts.partNumber || parts.connectivity}</Table.Cell>

                {
                  shopKeys.map((shopKey) => (
                    <Table.Cell key={`40mm_celluar_${model}_${shopKey}`} textAlign='center'>
                      {
                        parts.availabilities[shopKey] &&
                        <Icon color='green' name='checkmark' size='large' />
                      }
                    </Table.Cell>
                  ))
                }
              </Table.Row>
            )
          })
        })
      }
    </Table.Body>
  )

export default PartRow
