import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Yo</span>
            <span className="word">Aida</span>
            <span className="word">Noemi</span>
            <span className="word">Javi</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    /* color used to softly clip top and bottom of the .words container */
   .card {
    --bg-color: #212121;
    background-color: var(--bg-color);
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
  }

  .loader {
    color: rgb(124, 124, 124);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 10px;
    box-sizing: content-box;
    height: 16px;
    padding: 4px 4px;
    display: flex;
    border-radius: 3px;
  }

  .words {
    overflow: hidden;
    position: relative;
  }

  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 2px;
    color: #956afa;
    animation: spin_4991 4s infinite;
  }

  @keyframes spin_4991 {
    10% {
      transform: translateY(-102%);
    }

    25% {
      transform: translateY(-100%);
    }

    35% {
      transform: translateY(-202%);
    }

    50% {
      transform: translateY(-200%);
    }

    60% {
      transform: translateY(-302%);
    }

    75% {
      transform: translateY(-300%);
    }

    85% {
      transform: translateY(-402%);
    }

    100% {
      transform: translateY(-400%);
    }
  }
`;

export default Loader;
