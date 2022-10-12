import React from 'react';
import { Link } from 'react-router-dom';
import { intervals } from './constants';
import logoPancake from '../../assets/images/svg/utilities/logoPancake.svg';
import logoNET from '../../assets/images/svg/utilities/logoNET.svg';
import ingranaggio from '../../assets/images/svg/utilities/ingranaggio.svg';
import { useState, useEffect } from 'react';
import { useLazyFetch } from '../hooks/useLazyFetch';
import { linkWin, linkEarn, linksInfo, linksNFT, linkTrade } from './menuItems';
import {
  ParsedBinanceKline,
  BinanceKline,
} from '../pages/trade/ChartLayoutComponent';
import { PancakeWrittenIcon } from './navIcons';
import SettingsModal from './settingsModal';
import { FullSlimButton } from './buttons';
import { PancakeBunny } from './navIconsBunnyOnly';

type Link = {
  label: string;
  href: string;
};

const Nav: React.FC = () => {
  const { data, trigger: fetchNewData } =
    useLazyFetch<BinanceKline[]>('/api/v3/klines?');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('CAKEUSDT');
  const [parsedData, setParsedData] = useState<ParsedBinanceKline[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<string>(
    intervals[intervals.length - 1],
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const parsedData: ParsedBinanceKline[] = data.map((item) => {
        return {
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
          volume: parseFloat(item[5]),
          openTime: item[0],
          closeTime: item[6],
        };
      });
      setParsedData(parsedData);
    }
  }, [data]);

  useEffect(() => {
    const reqParams = new URLSearchParams({
      symbol: selectedSymbol,
      interval: selectedInterval,
    });

    fetchNewData({}, reqParams);
  }, [selectedInterval]);

  const [priceValue, setPriceValue] = useState<number | undefined>();

  useEffect(() => {
    setPriceValue(() => {
      const lastElement = parsedData?.pop();
      return lastElement?.close;
    });
  }, [parsedData]);

  const [hoverTrade, setHoverTrade] = useState<boolean>(false);
  const [hoverEarn, setHoverEarn] = useState<boolean>(false);
  const [hoverWin, setHoverWin] = useState<boolean>(false);
  const [hoverNFT, setHoverNFT] = useState<boolean>(false);
  const [hoverInfo, setHoverInfo] = useState<boolean>(false);

  const handleDropdownHoverTrade = (boolValue = false) => {
    setHoverTrade(boolValue);
  };
  const handleDropdownHoverEarn = (boolValue = false) => {
    setHoverEarn(boolValue);
  };
  const handleDropdownHoverWin = (boolValue = false) => {
    setHoverWin(boolValue);
  };
  const handleDropdownHoverNFT = (boolValue = false) => {
    setHoverNFT(boolValue);
  };
  const handleDropdownHoverInfo = (boolValue = false) => {
    setHoverInfo(boolValue);
  };

  return (
    <nav className='navbar  border-b-darkText bg-lightBackground dark:bg-darkBackgroundAlt dark:border-darkCardBorder z-20'>
      <SettingsModal
        isDialogOpen={isDialogOpen}
        closeModal={() => setIsDialogOpen(false)}
      />
      <div className='container_links hidden md:flex xl:flex '>
        <div className='logo-container flex'>
          <Link to={'/'}>
            <PancakeWrittenIcon />
            <PancakeBunny />
          </Link>
        </div>
        <div
          className='links-container md:flex-start xl:flex  '
          onMouseEnter={() => handleDropdownHoverTrade(true)}
          onMouseLeave={() => handleDropdownHoverTrade(false)}
        >
          {linkTrade.map((link: Link, i) => {
            return (
              <ul key={i} className='links'>
                <div className='nav-li'>
                  <li className='nav-li'>
                    <a className=' dark:text-darkTextSubtle' href={link.href}>
                      {link.label}
                      {hoverTrade && (
                        <div
                          className={`dropdown  dark:bg-darkBackgroundAlt dark:border-darkCardBorder`}
                        >
                          {linkTrade.map((item) => {
                            return item.sub?.map((item, index) => (
                              <ul
                                className={`${item.href}-ul
                                dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                              bg-white
                              py-0.5
                              text-left
                              rounded-lg
                              m-0
                              border-none`}
                                key={index}
                              >
                                <li
                                  key={index}
                                  className={`${item.href}-li  dropdown-item
                                  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                                  dark:hover:bg-darkTertiary
                                    text-sm
                                    py-2
                                    px-4
                                    font-normal
                                    block
                                    w-full
                                    whitespace-nowrap
                                    bg-transparent

                                    hover:bg-gray-100 `}
                                >
                                  {item.label}
                                </li>
                              </ul>
                            ));
                          })}
                        </div>
                      )}
                    </a>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>

        <div
          className='links-container'
          onMouseEnter={() => handleDropdownHoverEarn(true)}
          onMouseLeave={() => handleDropdownHoverEarn(false)}
        >
          {linkEarn.map((link: Link, i) => {
            return (
              <ul
                key={i}
                className='links py-0.5 text-left rounded-lg m-0 border-none'
              >
                <div className='nav-li'>
                  <li className='nav-li '>
                    <a className=' dark:text-darkTextSubtle' href={link.href}>
                      {link.label}
                      {hoverEarn && (
                        <div
                          className={`dropdown  dark:bg-darkBackgroundAlt dark:border-darkCardBorder`}
                        >
                          {linkEarn.map((item) => {
                            return item.sub?.map((item, index) => (
                              <ul
                                className={`${item.href}-ul  bg-white  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                              py-0.5
                              text-left
                              rounded-lg
                              m-0
                              border-none`}
                                key={index}
                              >
                                <li
                                  key={index}
                                  className={`${item.href}-li dropdown-item  dark:bg-darkBackgroundAlt dark:border-darkCardBorder dark:hover:bg-darkTertiary text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100`}
                                >
                                  {item.label}
                                </li>
                              </ul>
                            ));
                          })}
                        </div>
                      )}
                    </a>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
        <div
          className='links-container'
          onMouseEnter={() => handleDropdownHoverWin(true)}
          onMouseLeave={() => handleDropdownHoverWin(false)}
        >
          {linkWin.map((link: Link, i) => {
            return (
              <ul key={i} className='links'>
                <div className='nav-li'>
                  <li className='nav-li'>
                    <a className=' dark:text-darkTextSubtle' href={link.href}>
                      {link.label}
                      {hoverWin && (
                        <div
                          className={`dropdown  dark:bg-darkBackgroundAlt dark:border-darkCardBorder`}
                        >
                          {linkWin.map((item) => {
                            return item.sub?.map((item, index) => (
                              <ul
                                className={`${item.href}-ul bg-white dark:bg-darkBackgroundAlt dark:border-darkCardBorder py-0.5 text-left rounded-lg m-0 border-none`}
                                key={index}
                              >
                                <li
                                  key={index}
                                  className={`${item.href}-li dropdown-item dark:bg-darkBackgroundAlt dark:border-darkCardBorder dark:hover:bg-darkTertiary text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100`}
                                >
                                  {item.label}
                                </li>
                              </ul>
                            ));
                          })}
                        </div>
                      )}
                    </a>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
        <div
          className='links-container'
          onMouseEnter={() => handleDropdownHoverNFT(true)}
          onMouseLeave={() => handleDropdownHoverNFT(false)}
        >
          {linksNFT.map((link: Link, i) => {
            return (
              <ul key={i} className='links'>
                <div className='nav-li'>
                  <li className='nav-li'>
                    <a className=' dark:text-darkTextSubtle' href={link.href}>
                      {link.label}
                      {hoverNFT && (
                        <div
                          className={`dropdown  dark:bg-darkBackgroundAlt dark:border-darkCardBorder`}
                        >
                          {linksNFT.map((item) => {
                            return item.sub?.map((item, index) => (
                              <ul
                                className={`${item.href}-ul  bg-white  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                              py-0.5
                              text-left
                              rounded-lg
                              m-0
                              border-none`}
                                key={index}
                              >
                                <li
                                  key={index}
                                  className={`${item.href}-li dropdown-item  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                                  dark:hover:bg-darkTertiary
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent

              hover:bg-gray-100`}
                                >
                                  {item.label}
                                </li>
                              </ul>
                            ));
                          })}
                        </div>
                      )}
                    </a>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
        <div
          className='links-container'
          onMouseEnter={() => handleDropdownHoverInfo(true)}
          onMouseLeave={() => handleDropdownHoverInfo(false)}
        >
          {linksInfo.map((link: Link, i) => {
            return (
              <ul key={i} className='links'>
                <div className='nav-li'>
                  <li className='nav-li'>
                    <a className=' dark:text-darkTextSubtle' href={link.href}>
                      {link.label}
                      {hoverInfo && (
                        <div
                          className={`dropdown  dark:bg-darkBackgroundAlt dark:border-darkCardBorder`}
                        >
                          {linksInfo.map((item) => {
                            return item.sub?.map((item, index) => (
                              <ul
                                className={`${item.href}-ul  bg-white  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                              py-0.5
                              text-left
                              rounded-lg
                              m-0
                              border-none`}
                                key={index}
                              >
                                <li
                                  key={index}
                                  className={`${item.href}-li dropdown-item  dark:bg-darkBackgroundAlt dark:border-darkCardBorder
                                  dark:hover:bg-darkTertiary
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent

              hover:bg-gray-100`}
                                >
                                  {item.label}
                                </li>
                              </ul>
                            ));
                          })}
                        </div>
                      )}
                    </a>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>

      <div className='interactionsContainer overflow-hidden   '>
        <Link className='flex' to='trade'>
          <img
            className='growing hidden  xl:flex'
            src={logoPancake}
            alt='logo Pancake'
          />
        </Link>
        <p className='priceValueContainer hidden xl:flex dark:text-darkTextSubtle'>{`$${priceValue}`}</p>
        <button className='transparent'>
          <svg
            viewBox='0 0 24 24'
            color='textSubtle'
            width='24px'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-lightTextSubtle dark:fill-darkTextSubtle'
          >
            <path d='M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z'></path>
          </svg>
        </button>
        <button onClick={() => setIsDialogOpen(true)}>
          <svg
            viewBox='0 0 24 24'
            height='24'
            width='24'
            color='textSubtle'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-lightTextSubtle dark:fill-darkTextSubtle'
          >
            <path d='M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z'></path>
          </svg>
        </button>
        <FullSlimButton value={'Connect wallet'} />
      </div>
    </nav>
  );
};

export default Nav;
