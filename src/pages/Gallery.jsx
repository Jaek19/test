import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';
import { ImTelegram } from 'react-icons/im';

const Gallery = () => {

  const [dataImage, setDataImage] = useState([]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(process.env.PUBLIC_URL + '/data/data.json')
        const data = await res.json();
        setDataImage(data);
      } catch(error) {
        console.log('fetchImg error:', error);
      }
    }  
    fetchImg();
  },[]);

  return (
    <div className='gallery-container'>
      {/* 흐르는 이미지 시작 */}
      <div className='scroll-container'>
        <div className='scroll-track'>
          {
            dataImage.concat(dataImage).map((item, idx) => (
              <div className='scroll-item' key={idx}>
                <div> {item.title} </div>
                <img 
                  src={process.env.PUBLIC_URL + item.src} 
                  alt={item.title} 
                />
                <div> {item.dis} </div>
              </div>  
            ))
          }
        </div> 
      </div>
        {/* 페이드 이미지 */}
        <motion.div
          className='fade-section'
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once:true, amount:0.4 }}
        >
          <div className='img-box'>
            <img src={process.env.PUBLIC_URL + '/images/img1.jpg'} alt="img1" />
          </div>
          <div className='txt-box'>
            <h2>hello</h2>
            <h4>hello, hello</h4>
          </div>
        </motion.div>
        <motion.div
          className='fade-section'
          initial={{ opacity:0, y: 60}}
          whileInView={{ opacity:1, y: 0}}
          transition={{ delay:1, duration:1.5, ease:'easeOut'}}
          viewport={{ once:true, amount:0.7 }}
        >
          <div className='img-box'>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2" />   
          </div>
          <div className='txt-box'>
            <h2>hello</h2>
            <h4>hello, hello</h4>
          </div>
        </motion.div>

        {/* 모아지는 이미지 */}
        <div className='group-img'>
          {
            [0, 1, 2, 3].map((i) => {
              const angle = (i * Math.PI / 2);
              const x = -Math.cos(angle) * 150;
              const y = -Math.sin(angle) * 150;
              return (<motion.img
                key={i}
                src={process.env.PUBLIC_URL + '/images/img/' + i+1 + '.jpg'}
                initial={{ opacity: 0, x, y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: i * 0.5 }}
                viewport={{ once:true, amount:0.5 }}
                alt='groupImg'
              />
              );
            })
          }
        </div>
    </div>
  )
}

export default Gallery
