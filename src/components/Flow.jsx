import React from 'react';
import { Box, Typography, Container, Tabs, Tab } from '@mui/material';

const Flow = () => {
  const [value, setValue] = React.useState(0);
  const videoLink = 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/videos/instructions.mov';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 15, mb: 10, textAlign: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': {
              backgroundColor: '#00fff2',
            },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#00fff2',
              },
            },
          }}
        >
          <Tab label="演示视频" />
        </Tabs>

        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          {value === 0 && (
            <Box
              component="video"
              src={videoLink}
              controls
              poster=""  // 可选：放封面图链接
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{
            mt: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          通过这段演示视频，你可以了解如何使用 AI 自动优化简历内容，一键提升投递命中率。
        </Typography>
      </Box>
    </Container>
  );
};

export default Flow;
