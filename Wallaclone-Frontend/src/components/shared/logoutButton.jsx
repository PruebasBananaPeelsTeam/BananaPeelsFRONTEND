import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const LogoutButton = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <StyledWrapper>
      <button className="Btn " onClick={onClick}>
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        <div className="text">{t("logout.logoutButton")}</div>
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 125px;
  display: flex;
  justify-content: flex-end;

  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    background-color: rgba(
      30,
      30,
      30,
      0.9
    ); /* Elegante oscuro semi-transparente */
  }

  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }

  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.1em;
    font-weight: 500;
    transition-duration: 0.3s;
  }

  .Btn:hover {
    width: 125px;
    border-radius: 12px; /* más fino, estilo pill elegante */
    transition-duration: 0.3s;
    background-color: rgba(50, 50, 50, 0.95); /* Más visible al hacer hover */
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }

  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }

  .Btn:active {
    transform: translate(2px, 2px);
  }
`

export default LogoutButton
