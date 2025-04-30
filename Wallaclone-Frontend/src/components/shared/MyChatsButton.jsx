import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const MyChatsButton = () => {
  const navigate = useNavigate()

  return (
    <StyledWrapper>
      <ul>
        <li onClick={() => navigate('/my-chats')}>
          <span className="icon">💬</span>
          <span className="title">My chats</span>
        </li>
      </ul>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  ul {
    position: relative;
    display: flex;
    gap: 25px;
  }

  ul li {
    --i: #56ccf2;
    --j: #2f80ed;
    position: relative;
    list-style: none;
    width: 36px; /* 40% de 60px = 36px */
    height: 36px;
    background: #fff;
    border-radius: 36px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
  }

  ul li:hover {
    width: 80px; /* expandimos al hacer hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0);
  }

  ul li::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 36px;
    background: linear-gradient(45deg, var(--i), var(--j));
    opacity: 0;
    transition: 0.5s;
  }

  ul li:hover::before {
    opacity: 1;
  }

  ul li::after {
    content: '';
    position: relative;
    top: 6px;
    width: 100%;
    height: 100%;
    border-radius: 36px;
    background: linear-gradient(45deg, var(--i), var(--j));
    transition: 0.5s;
    filter: blur(10px);
    z-index: -1;
    opacity: 0;
  }

  ul li:hover::after {
    opacity: 0.5;
  }

  ul li .icon {
    color: #777;
    font-size: 1em;
    transition: 0.4s;
    transition-delay: 0.25s;
  }

  ul li:hover .icon {
    transform: scale(0);
    color: #fff;
    transition-delay: 0s;
  }

  ul li span {
    position: absolute;
  }

  ul li .title {
    color: #fff;
    font-size: 0.8em;
    letter-spacing: 0.05em;
    transform: scale(0);
    transition: 0.5s;
    transition-delay: 0s;
  }

  ul li:hover .title {
    transform: scale(1);
    transition-delay: 0.25s;
  }

  /* Responsiveness */
  @media (max-width: 1024px) {
    ul li {
      width: 32px;
      height: 32px;
    }
    ul li:hover {
      width: 100px;
    }
    ul li .icon {
      font-size: 1em;
    }
    ul li .title {
      font-size: 0.8em;
    }
  }

  @media (max-width: 768px) {
    ul li {
      width: 30px;
      height: 30px;
    }
    ul li:hover {
      width: 90px;
    }
    ul li .icon {
      font-size: 0.9em;
    }
    ul li .title {
      font-size: 0.7em;
    }
  }

  @media (max-width: 480px) {
    ul li {
      width: 28px;
      height: 28px;
    }
    ul li:hover {
      width: 80px;
    }
    ul li .icon {
      font-size: 0.8em;
    }
    ul li .title {
      font-size: 0.65em;
    }
  }
`

export default MyChatsButton
