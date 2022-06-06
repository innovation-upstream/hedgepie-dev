import React, { useEffect, useState } from 'react'
import { Box, Input } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

const UploadArtwork = () => {
  const { formData, setFormData } = React.useContext(MintWizardContext)
  const [file, setFile] = useState()

  const handleChange = (e) => {
    if (e?.target?.files?.length > 0) {
      setFile(e?.target?.files[0])
    }
  }

  useEffect(() => {
    if (file == null) return
    let reader = new FileReader()
    reader.onload = function (e: any) {
      setFormData({
        ...formData,
        artWorkFile: file,
        artWorkUrl: e.target.result,
      })
    }
    reader.readAsDataURL(file as unknown as Blob)
  }, [file])

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
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: '#16103A',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 24,
          },
        }}
      >
        Upload Artwork
      </Box>
      <Box
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: '#DF4886',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16,
          },
        }}
      >
        Associate an illustration or file?
      </Box>
      <Box
        sx={{
          fontSize: 12,
          mt: 22,
          color: '#8E8DA0',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16,
          },
        }}
      >
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here', making it look like readable English.
      </Box>
      <Box mt={24}>
        <Box as="label">
          <Input
            type="file"
            className="artwork-file-input"
            sx={{
              width: 0,
              height: 0,
              padding: 0,
              opacity: 0,
            }}
            onChange={handleChange}
          />
          <Box
            as="span"
            sx={{
              maxWidth: 270,
              width: '100%',
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#16103A',
              color: '#fff',
              borderRadius: 64,
              transition: 'all .2s',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#16103AEE',
              },
              '&:active': {
                backgroundColor: '#16103A',
              },
            }}
          >
            UPLOAD
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UploadArtwork
