//@ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { T, Image, Layout, SEO } from '../components';

import {
  TranslationContext,
  PictureContext,
  SEOContext,
} from '../utils/contexts';
import { getDataFromAirtable } from '../utils';
import { TranslationsType, ImagesType, SEOType } from '../types';
let prevHeight = 0;

// DRAW BUFFER FUNCTION
// *** takes { width, height } from your target element & it's { context }
// *** takes { buffer } as a decoded audio buffer
// *** and draws the audio buffer as a SVG waveform in target element
function drawBuffer(context, buffer) {
  console.log('drawing fired');

  let width = context.canvas.clientWidth;
  let height = context.canvas.clientHeight;

  // channel data (samples)
  let data = buffer;

  // sample step size
  let step = Math.ceil(data.length / width);
  // amp
  let amp = height / 2;

  let prevHeight = 0;

  let sum = data.reduce((previous, current) => (current += previous));
  let avg = (sum / data.length) * amp;

  console.log(avg);

  // loop x-pos
  for (var i = 0; i < width; i++) {
    let min = 1.0;
    let max = -1.0;

    // zoom samples
    for (let j = 0; j < step; j++) {
      let block = data[i * step + j];
      if (block < min) {
        min = block;
      }
      if (block > max) {
        max = block;
      }
    }

    // bar data
    let w = 1;
    let h = Math.max(1, (max - min) * amp);
    let x = i;
    let y = (height - h) / 2;

    if (
      Math.abs(h, prevHeight) < 10 &&
      Math.abs(h, prevHeight) > 1 &&
      !(h > height) &&
      !(Math.abs(h, prevHeight) > 50)
    ) {
      h = Math.max(1, (max - min) * (amp * 10));
      y = (height - h) / 2;
      prevHeight = 0;
      // console.log("current: ", h);
    }

    context.rect(w, h, 10, 10).move(x, y).fill('#000').attr('fill-opacity', 1);
    prevHeight = h;

    // console.log("prev: ", prevHeight);
  }
}

function isEven(n) {
  return n % 2 == 0;
}

// READ AUDIO FILE AS ARRAY BUFFER
// *** outputs decoded array buffer
function readAudioFile(audio_file) {
  // initialize new temp FileReader object
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    // when read succesfully
    fileReader.onload = () => {
      // decode audio array buffer
      audioContext.decodeAudioData(fileReader.result).then((audio_buffer) => {
        // resolve promise with decoded buffer
        resolve(audio_buffer);
      });
    };

    // when there's an error
    fileReader.onerror = () => {
      fileReader.abort(); // abort fileReader
      reject(fileReader.error); // reject promise; include error
    };

    fileReader.readAsArrayBuffer(audio_file);
  });
}

let onError = function (err) {
  console.log('The following error occured: ' + err);
};

const IndexPage = ({ translations, pics, seo }: IndexPageProps) => {
  const [microphone, setMicrophone] = useState();
  const [recording, setRecording] = useState(false);
  const onSuccess = (stream) => {
    let chunks = [];
    // @ts-ignore
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstop = function (e) {
      const c = document.getElementById('canvas');
      console.log(chunks);
      const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
      const audioURL = window.URL.createObjectURL(blob);

      // drawBuffer(c.getContext('2d'), chunks);
      const audio = document.createElement('audio');
      chunks = [];
      audio.src = audioURL;
      audio.controls = true;
      document.getElementById('test').appendChild(audio);
    };
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    setMicrophone(mediaRecorder);
  };
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = { audio: true };

      navigator.mediaDevices
        .getUserMedia(constraints)
        // @ts-ignore
        .then(onSuccess, onError);
    }
  }, []);

  const recordAudio = () => {
    recording
      ? // @ts-ignore
        microphone!.stop()
      : // @ts-ignore
        microphone.start();

    setRecording(!recording);
  };

  return (
    <PictureContext.Provider value={pics}>
      <SEOContext.Provider value={seo}>
        <TranslationContext.Provider value={translations}>
          <Layout page="home">
            <SEO seo={seo}></SEO>
            <Main>
              <Create>
                <h1>Create your own soundwave print</h1>
                <h2>Turn your spoken words into beautiful art.</h2>

                <div className="record">
                  <h4>Your spoken words </h4>
                  <div className="wrap">
                    <label className="whiteButton" htmlFor="inputAudio">
                      <span>Upload Audio</span>
                      <span className="blackButton">
                        <i className="fa fa-upload"></i>
                      </span>
                      <input type="file" name="inputAudio" id="inputAudio" />
                    </label>
                    <div onClick={recordAudio} className="whiteButton">
                      <span>{recording ? 'Stop' : 'Record Audio'}</span>
                      <button className="blackButton">
                        {recording ? (
                          <i className="fa fa-stop"></i>
                        ) : (
                          <i className="fa fa-microphone"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div id="test"></div>
                  <span className="info">
                    Upload or record audio up to 60 seconds long. Supported
                    files are .mp3 and .wav
                  </span>
                </div>
                <div className="record">
                  <h4>Add text to your art</h4>
                  <input type="text" name="" id="" />
                </div>

                <div className="record">
                  <h4>When was your special occasion</h4>
                  <input type="text" name="" id="" />
                </div>

                <div className="record">
                  <h4>Where was your special occasion</h4>
                  <input type="text" name="" id="" />
                </div>

                <button className="continue">
                  <span>Continue</span>
                  <i className="fa fa-arrow-right"></i>
                </button>
              </Create>
              <Canvas>
                <canvas id="canvas"></canvas>
              </Canvas>
            </Main>
          </Layout>
        </TranslationContext.Provider>
      </SEOContext.Provider>
    </PictureContext.Provider>
  );
};

const Main = styled.main`
  min-height: 100vh;
  display: flex;
`;
const Create = styled.aside`
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  h2 {
    font-weight: 100;
    font-size: 1.2rem;
    font-family: sans-serif;
    margin-bottom: 2rem;
  }
  .record {
    background: var(--background-dark);
    h4 {
      margin-bottom: 1rem;
    }
    padding: 1rem;
    margin-bottom: 1rem;
  }
  input[type='text'] {
    width: 100%;
    font-size: inherit;
    line-height: 1.5rem;
    font-weight: 100;
    padding: 4px;
    font-family: inherit;
  }
  .wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .whiteButton {
      display: flex;
      background: white;
      justify-content: space-between;
      font-weight: 100;
      cursor: pointer;
      span {
        padding: 14px 10px;
      }
      .blackButton {
        padding: 15px;
        color: white;
        border: none;
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    input {
      display: none;
    }
  }
  padding: 2rem;
  flex: 1;
  background: white;
  .info {
    font-size: 10px;
    font-weight: 100;
  }
  button {
    cursor: pointer;
  }
  .continue {
    width: 100%;
    background: black;
    color: white;
    display: flex;
    justify-content: space-between;
    border: none;
    padding: 1rem;
    span {
      margin: auto;
    }
  }
`;
const Canvas = styled.div`
  flex: 2;
  background: var(--background-dark);
`;
export const getStaticProps = async () => {
  const data = await getDataFromAirtable();
  return {
    props: {
      translations: data.translations.filter((x) => x.id),
      pics: data.pics.filter((x) => x.id),
      seo: data.seo.filter((x) => x.id),
    },
  };
};

type IndexPageProps = {
  translations: TranslationsType[];
  pics: ImagesType[];
  seo: SEOType[];
};

export default IndexPage;
