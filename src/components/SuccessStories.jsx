import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Chip,
  Divider,
  Dialog,
  DialogContent
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const interviewImages = [
  { id: 1, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/1.png' },
  { id: 2, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/2.png' },
  { id: 3, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/3.png' },
  { id: 4, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/4.png' },
  { id: 5, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/5.png' },
  { id: 6, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/6.png' },
  { id: 7, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/7.png' },
  { id: 8, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/8.png' },
  { id: 9, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/9.png' },
  { id: 10, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/10.png' },
  { id: 11, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/11.png' },
  { id: 12, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/12.png' },
  { id: 13, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/13.png' },
  { id: 14, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/14.png' },
  { id: 15, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/15.png' },
  { id: 16, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/16.png' },
  { id: 17, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/17.png' },
  { id: 18, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/18.png' },
  { id: 19, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/19.png' },
  { id: 20, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/20.png' },
  { id: 21, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/21.png' },
  { id: 22, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/22.png' },
  { id: 23, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/23.png' },
  { id: 24, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/24.png' },
  { id: 25, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/25.png' },
  { id: 26, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/26.png' },
  { id: 27, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/27.png' },
  { id: 28, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offers/28.png' },
];



const offerImages = [
  { id: 1, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/1.png' },
  { id: 2, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/2.png' },
  { id: 3, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/3.png' },
  { id: 4, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/4.png' },
  { id: 5, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/5.png' },
  { id: 6, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/6.png' },
  { id: 7, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/7.png' },
  { id: 8, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/8.png' },
  { id: 9, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/9.png' },
  { id: 10, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/10.png' },
  { id: 11, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/11.png' },
  { id: 12, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/12.png' },
  { id: 13, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/13.png' },
  { id: 14, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/14.png' },
  { id: 15, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/15.png' },
  { id: 16, imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/offer_letters/16.png' },
];



const SuccessStories = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#00fff2', textAlign: 'center', mb: 4 }}>
        成功案例
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          他们都通过AI简历助手成功跳槽
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          我们已经帮助数千名求职者优化简历，获得理想的工作机会
        </Typography>
      </Box>

      {/* 第一个 Offer 图片展示区域 */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#00fff2', textAlign: 'center', mb: 4 }}>
          面试通知 | 未完全统计
        </Typography>
        <Box 
          sx={{ 
            height: '400px', // 显示一排半的高度
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 255, 242, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 255, 242, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 255, 242, 0.5)',
              },
            },
          }}
        >
          <Grid container spacing={3}>
            {interviewImages.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(0, 255, 242, 0.05)',
                    border: '1px solid rgba(0, 255, 242, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      border: '1px solid rgba(0, 255, 242, 0.8)',
                      boxShadow: '0 0 15px rgba(0, 255, 242, 0.5)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                  onClick={() => setSelectedImage(item.imageUrl)}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={`Offer ${item.id}`}
                    sx={{ 
                      width: '100%',
                      height: '250px',
                      objectFit: 'contain',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      padding: '10px',
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* 第二个 Offer 图片展示区域 */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#00fff2', textAlign: 'center', mb: 4 }}>
          Offer 展示 | 未完全统计
        </Typography>
        <Box 
          sx={{ 
            height: '400px', // 显示一排半的高度
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 255, 242, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 255, 242, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 255, 242, 0.5)',
              },
            },
          }}
        >
          <Grid container spacing={3}>
            {offerImages.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={`offer-${item.id}`}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(0, 255, 242, 0.05)',
                    border: '1px solid rgba(0, 255, 242, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      border: '1px solid rgba(0, 255, 242, 0.8)',
                      boxShadow: '0 0 15px rgba(0, 255, 242, 0.5)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                  onClick={() => setSelectedImage(item.imageUrl)}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={`Offer ${item.id}`}
                    sx={{ 
                      width: '100%',
                      height: '250px',
                      objectFit: 'contain',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      padding: '10px',
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* 图片查看对话框 */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(2, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
          }
        }}
      >
        <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center' }}>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Offer" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh',
                objectFit: 'contain'
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SuccessStories; 