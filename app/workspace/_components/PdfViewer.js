import React from 'react'

function PdfViewer({fileUrl}) {
  console.log(fileUrl);
  return (
    <iframe src={fileUrl+'#toolbar=0'} height='90vh' width='100%' className='h-screen'/>
  )
}

export default PdfViewer