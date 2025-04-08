import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Proof from './Proof';
import Flow from './Flow.jsx';

const Home = ({ translations }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          pt: 8,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: '#00fff2',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            textShadow: '0 0 10px rgba(0, 255, 242, 0.5)',
          }}
        >
          {translations.homeTitle}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            maxWidth: '800px',
          }}
        >
          {translations.homeDescription}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/editor')}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            py: 2,
            px: 6,
            backgroundColor: '#00fff2',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 242, 0.8)',
            }
          }}
        >
          {translations.startButton}
        </Button>
      </Box>

      <Box sx={{ mt: 12 }}>
        <Proof />
      </Box>

      {/* 简历对比展示部分 */}
      <Box
        sx={{
          mt: 15,
          mb: 15,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 6,
            color: '#00fff2',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
          }}
        >
          简历优化效果
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '800px',
            width: '100%',
          }}
        >
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: isHovered ? '25%' : 0,
              opacity: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'absolute',
            }}
          >
            <Box
              sx={{
                width: '500px',
                height: '700px',
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 242, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
                p: 2,
              }}
            >
              <img
                src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/origin.png"
                alt="原始简历"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  mt: 2,
                  color: '#00fff2',
                }}
              >
                原始简历
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ x: '-25%', opacity: 0 }}
            animate={{
              x: isHovered ? 0 : '-25%',
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.8
            }}
            style={{
              position: 'absolute',
            }}
          >
            <Box
              sx={{
                width: '500px',
                height: '700px',
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 242, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
                p: 2,
              }}
            >
              <img
                src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/modified.png"
                alt="优化后的简历"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  mt: 2,
                  color: '#00fff2',
                }}
              >
                优化后的简历
              </Typography>
            </Box>
          </motion.div>
        </Box>

        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
          }}
        >
          将鼠标移入查看优化效果
        </Typography>
      </Box>

      <Box>
        <Flow />
      </Box>
    </Container>
  );
};

export default Home;
