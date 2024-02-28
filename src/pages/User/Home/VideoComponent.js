import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContainerHeader } from '../../../components/user/ContainerHeader';


const VideoComponent = () => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        // Strapi视频API端点
        axios.get('http://localhost:1337/api/upload/files')
            .then(response => {
                console.log("response.data.url", response.data)
                setVideoUrl("http://localhost:1337"+response.data[0].url);
            })
            .catch(error => {
                console.error('Error fetching video from Strapi', error);
            });
    }, []);

    return (
        <div style={{maxWidth: 1280,margin:"auto"}}>
            <ContainerHeader title="Course Videos"/>
            {videoUrl && <video width="320" height="240" controls>
                <source src={videoUrl} type="video/mp4" />
                Blablabla
            </video>}
        </div>
    );
    console.log('Video URL in render:', videoUrl);
};

export default VideoComponent;