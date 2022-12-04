import Head from 'next/head';
import Image from 'next/image';
import YLLogo from '../assets/logo.png';
import Logo from '../assets/universe.png';
import { useState } from 'react';

const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

const onUserChangedText = (event) => {
  //console.log(event.target.value);
  setUserInput(event.target.value);
};
  return (
    <div className="root">
      <Head>
        <title>Sapere Aude | Yangli Liu</title>
      </Head>
      <div className="container">
      <Image src={Logo} alt="Header Image" />
        <div className="header">
          <div className="header-title">
            <h1>Sapere Aude</h1>
          </div>
          <div className="header-subtitle">
            <h2>Dare to be Wise: A Dialogue</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Ask your Question here" className="prompt-box" 
          value={userInput} onChange={onUserChangedText}/>
          <div className="a-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : 
                <p>Chatting</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Wise Words</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={YLLogo} alt="Amy's logo" />
            <p>Yangli build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
