import { useEffect, useState } from 'react';
import './App.css'
import colorArray from './color'
import {BsTwitter} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import {FaFreeCodeCamp} from 'react-icons/fa'
import {FaQuoteLeft} from 'react-icons/fa'


const url = "https://type.fit/api/quotes";

let color;


const App = () => {
  const [data, setData] = useState([]); 
  const [quote, setQuote] = useState({});
  
  const getRandomQuote = (prevQuote) => {
    let prevQuoteIndex = data.indexOf(data.find((quote => quote.text == prevQuote)))
    let index = Math.floor(Math.random() * data.length);
    if (prevQuoteIndex === index) {
      return getRandomQuote(data[index].text)
    }
    setQuote(data[index]);
  }

  const changeColor = (prevColor) => {
    color = colorArray[Math.floor(Math.random() * colorArray.length)];
    if(color === prevColor){
      return changeColor(color);
    }
    document.querySelectorAll('.colored').forEach(element=> {
      if(element !== document.body) {
        element.style.color = color;
        return;
      }
      element.style.backgroundColor = color;
      })
  }

  const fadeOut = () => {
    document.querySelectorAll('.text').forEach(element => {
      element.classList.remove('text');
      void element.offsetWidth;
      element.classList.add('text');
    })
  }

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setQuote(data[Math.floor(Math.random() * data.length)])
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
  },[]);

  useEffect(() => {
    changeColor(color);
  },[])

  return (
    <>
      <header>
        <h1>Quote Machine</h1>
      </header>
      <main>
        <div className="quote-box" id="quote-box">
          <h2 style={{color: color}} className="colored text" id="text"><FaQuoteLeft /> {quote.text || 'No quotes for You'}</h2>
          <h4 style={{color: color}} className="colored text" id="author">-{quote.author || 'OzZy'}</h4>
          <div className="tweet-quote-wrapper">
              <button><a id="tweet-quote" className="colored" href="twitter.com/intent/tweet" target="_blank">
                  <BsTwitter />
              </a></button>
              <button id="new-quote" className="colored" type="button" onClick={() => {getRandomQuote(quote.text); changeColor(color);fadeOut()}}>Next Quote</button>
          </div>
        </div>
      </main>
      <footer>
        <span id='coder'>By Ahmad Osman</span>
        <span><a rel='author' href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"><BsLinkedin className='footer-icon'/></a></span>
        <span><a rel='author' alt='FreeCodeCamp' href="https://www.freecodecamp.org/fccd5aa6897-439f-4b3e-b4a9-c5bda7c2e055"><FaFreeCodeCamp className='footer-icon'/></a></span>
      </footer>
    </>
  )
}

export default App
