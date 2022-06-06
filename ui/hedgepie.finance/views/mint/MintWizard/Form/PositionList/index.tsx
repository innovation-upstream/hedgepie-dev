import React, { useEffect } from 'react'
import { Box, Button } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import Head from './Head'
import Position from './Position'

const PositionList = () => {
  const { formData, setFormData, strategies } = React.useContext(MintWizardContext)

  const handleAdd = () => {
    setFormData({
      ...formData,
      allocated: formData.allocated + 1,
      positions: [
        ...formData.positions,
        {
          composition: { name: 'Select a Strategy..' },
          weight: 1,
          locked: false,
        },
      ],
    })
  }

  useEffect(() => {
    if (strategies?.length && !formData?.positions.length) {
      handleAdd()
    }
  }, [strategies])

  const handleUpdate = (index, newData) => {
    const newPositions = formData.positions.map((d, i) => (i === index ? newData : d))
    const allocated = newPositions.reduce((p, c) => p + parseInt(c.weight), 0)
    setFormData({
      ...formData,
      allocated,
      positions: newPositions,
    })
  }

  const handleDelete = (index) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter((d, i) => i !== index),
    })
  }

  const handleLock = (index) => {
    setFormData({
      ...formData,
      positions: formData.positions.map((d, i) => (i === index ? { ...d, locked: !d.locked } : d)),
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
        },
      }}
    >
      <Head />
      <Box
        sx={{
          mt: 4,
          minHeight: 300,
        }}
      >
        {formData.positions.map((d, i) => (
          <Box key={i} mt={3}>
            <Position
              data={d}
              onUpdate={(composition) => handleUpdate(i, composition)}
              onLock={() => handleLock(i)}
              onDelete={() => handleDelete(i)}
              allocated={formData.allocated}
            />
          </Box>
        ))}
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
