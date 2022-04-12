import React from 'react'
import { Box, Button } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import Head from './Head'
import Position from './Position'

const PositionList = () => {

  const { formData, setFormData, compositionOptions } = React.useContext(MintWizardContext)

  const handleAdd = () => {
    setFormData({
      ...formData,
      positions: [
        ...formData.positions,
        {
          composition: compositionOptions[0],
          weight: 25
        }
      ]
    })
  }

  const handleUpdate = (index, composition) => {
    setFormData({
      ...formData,
      positions: formData.positions.map((d, i) => {
        if (i === index) {
          return {
            ...d,
            composition
          }
        }
        return d
      })
    })
  }

  const handleDelete = (index) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter((d, i) => i !== index)
    })
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#E5F6FF',
        borderRadius: 8,
        [`@media screen and (min-width: 500px)`]: {
          padding: 24,
        }
      }}
    >
      <Head />
      <Box
        sx={{
          mt: 4,
        }}
      >
        {formData.positions.map((d, i) =>
          <Box key={i} mt={3}>
            <Position
              data={d}
              onUpdate={composition => handleUpdate(i, composition)}
              onDelete={() => handleDelete(i)}
            />
          </Box>
        )}
      </Box>
      <Box mt={4}>
        <Button
          variant="info"
          sx={{
            borderRadius: 40,
            height: 64,
            cursor: 'pointer',
            transition: 'all .2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #1799DE',
            maxWidth: 180,
            width: '100%',
            padding: 0,
          }}
          onClick={handleAdd}
        >
          Add Position
        </Button>
      </Box>
    </Box>
  )
}

export default PositionList